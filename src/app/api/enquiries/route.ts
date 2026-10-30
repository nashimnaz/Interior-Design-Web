import { NextResponse } from 'next/server';
import { getStore, recalculateStats } from '@/lib/dataService';
import { Enquiry } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const status = searchParams.get('status') || 'All';

  const store = getStore();
  let filtered = store.enquiries;

  if (search) {
    filtered = filtered.filter(e => 
      e.clientName.toLowerCase().includes(search) || 
      e.email.toLowerCase().includes(search) ||
      e.phone.includes(search) ||
      e.service.toLowerCase().includes(search) ||
      e.message.toLowerCase().includes(search)
    );
  }

  if (status && status !== 'All') {
    filtered = filtered.filter(e => e.status === status);
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

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      clientName: body.clientName || body.name || 'Anonymous Client',
      email: body.email || 'client@example.com',
      phone: body.phone || '',
      service: body.service || body.serviceInterest || 'Interior Consultation',
      budget: body.budget || '$50,000 - $100,000',
      timeline: body.timeline || 'Flexible',
      message: body.message || '',
      status: body.status || 'New',
      notes: body.notes || '',
      assignedTo: body.assignedTo || 'Unassigned',
      createdAt: new Date().toISOString()
    };

    store.enquiries.unshift(newEnquiry);
    recalculateStats();

    return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid enquiry payload' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const store = getStore();

    const index = store.enquiries.findIndex(e => e.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    store.enquiries[index] = {
      ...store.enquiries[index],
      ...updates
    };

    recalculateStats();
    return NextResponse.json({ success: true, data: store.enquiries[index] });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update enquiry' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Enquiry ID is required' }, { status: 400 });
  }

  const store = getStore();
  const initialLength = store.enquiries.length;
  store.enquiries = store.enquiries.filter(e => e.id !== id);

  if (store.enquiries.length === initialLength) {
    return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
  }

  recalculateStats();
  return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
}
