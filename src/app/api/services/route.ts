import { NextResponse } from 'next/server';
import { getStore, saveStoreToDisk } from '@/lib/dataService';
import { ServiceItem } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const status = searchParams.get('status') || 'All';
  const search = searchParams.get('search')?.toLowerCase().trim() || '';

  const store = getStore();
  let services = store.services || [];

  // Single lookup by slug
  if (slug) {
    const service = services.find(
      (s) => s.slug.toLowerCase() === slug.toLowerCase()
    );
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: service });
  }

  // Filter by status (public website uses status=Published)
  if (status && status !== 'All') {
    services = services.filter((s) => s.status === status);
  }

  // Filter by search
  if (search) {
    services = services.filter(
      (s) =>
        s.title.toLowerCase().includes(search) ||
        s.shortDescription.toLowerCase().includes(search) ||
        s.fullDescription.toLowerCase().includes(search)
    );
  }

  // Sort by displayOrder ascending
  services.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return NextResponse.json({
    success: true,
    data: services,
    total: services.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = getStore();

    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: body.title || 'Untitled Service',
      slug: (body.slug || body.title || 'service')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      number: body.number || `0${(store.services?.length || 0) + 1}`,
      shortDescription: body.shortDescription || '',
      fullDescription: body.fullDescription || body.shortDescription || '',
      heroImage: body.heroImage || '/images/services/arch-card.jpg',
      additionalImages: Array.isArray(body.additionalImages) ? body.additionalImages : [],
      deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
      features: Array.isArray(body.features) ? body.features : [],
      displayOrder: Number(body.displayOrder) || (store.services?.length || 0) + 1,
      seoTitle: body.seoTitle || body.title,
      seoDesc: body.seoDesc || body.shortDescription?.slice(0, 160),
      status: body.status || 'Published',
      createdAt: new Date().toISOString(),
    };

    if (!store.services) {
      store.services = [];
    }
    store.services.push(newService);
    saveStoreToDisk();

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid service payload' },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const store = getStore();

    if (!store.services) {
      store.services = [];
    }

    const index = store.services.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    store.services[index] = {
      ...store.services[index],
      ...updates,
    };

    saveStoreToDisk();
    return NextResponse.json({ success: true, data: store.services[index] });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Service ID is required' },
      { status: 400 }
    );
  }

  const store = getStore();
  if (!store.services) {
    return NextResponse.json(
      { success: false, error: 'Service not found' },
      { status: 404 }
    );
  }

  const initialCount = store.services.length;
  store.services = store.services.filter((s) => s.id !== id);

  if (store.services.length === initialCount) {
    return NextResponse.json(
      { success: false, error: 'Service not found' },
      { status: 404 }
    );
  }

  saveStoreToDisk();
  return NextResponse.json({
    success: true,
    message: 'Service deleted successfully',
  });
}
