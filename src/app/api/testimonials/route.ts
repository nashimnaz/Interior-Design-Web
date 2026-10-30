import { NextResponse } from 'next/server';
import { getStore, recalculateStats } from '@/lib/dataService';
import { Testimonial } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const status = searchParams.get('status') || 'All';

  const store = getStore();
  let filtered = store.testimonials;

  if (search) {
    filtered = filtered.filter(t => 
      t.clientName.toLowerCase().includes(search) || 
      t.quote.toLowerCase().includes(search) ||
      t.projectTitle.toLowerCase().includes(search) ||
      t.clientRole.toLowerCase().includes(search)
    );
  }

  if (status && status !== 'All') {
    filtered = filtered.filter(t => t.status === status);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = getStore();

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      clientName: body.clientName || 'Anonymous Client',
      clientRole: body.clientRole || 'Homeowner',
      clientLocation: body.clientLocation || 'Thiruvananthapuram, Kerala',
      clientPhoto: body.clientPhoto || '',
      quote: body.quote || '',
      rating: Number(body.rating) || 5,
      projectTitle: body.projectTitle || 'Private Residence',
      displayOrder: Number(body.displayOrder) || (store.testimonials?.length || 0) + 1,
      status: body.status || 'Approved',
      featured: Boolean(body.featured),
      createdAt: new Date().toISOString()
    };

    store.testimonials.unshift(newTestimonial);
    recalculateStats();

    return NextResponse.json({ success: true, data: newTestimonial }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid testimonial payload' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const store = getStore();

    const index = store.testimonials.findIndex(t => t.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }

    store.testimonials[index] = {
      ...store.testimonials[index],
      ...updates
    };

    recalculateStats();
    return NextResponse.json({ success: true, data: store.testimonials[index] });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Testimonial ID is required' }, { status: 400 });
  }

  const store = getStore();
  const initialLength = store.testimonials.length;
  store.testimonials = store.testimonials.filter(t => t.id !== id);

  if (store.testimonials.length === initialLength) {
    return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
  }

  recalculateStats();
  return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
}
