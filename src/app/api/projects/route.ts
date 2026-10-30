import { NextResponse } from 'next/server';
import { getStore, recalculateStats } from '@/lib/dataService';
import { Project } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const category = searchParams.get('category') || 'All';
  const status = searchParams.get('status') || 'All';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '0', 10);

  const store = getStore();

  // 1. Single project lookup by slug
  if (slug) {
    const project = store.projects.find(p => p.slug === slug);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  }

  let filtered = store.projects;

  // 2. Publication status filtering (Frontend requests status=Published)
  if (status && status !== 'All') {
    filtered = filtered.filter(p => p.status === status);
  }

  // 3. Category filtering with support for both exact categories and discipline groups
  if (category && category !== 'All') {
    const catLower = category.toLowerCase();
    filtered = filtered.filter(p => {
      const pCat = p.category.toLowerCase();
      if (catLower === 'residential') {
        return pCat.includes('residential') || pCat.includes('villa') || pCat.includes('penthouse') || pCat.includes('living') || pCat.includes('bedroom') || pCat === 'residential';
      }
      if (catLower === 'commercial') {
        return pCat.includes('commercial') || pCat.includes('office') || pCat.includes('headquarters') || pCat === 'commercial';
      }
      if (catLower === 'interior') {
        return pCat.includes('interior') || pCat.includes('kitchen') || pCat.includes('living') || pCat.includes('bedroom') || pCat === 'interior';
      }
      if (catLower === 'renovation') {
        return pCat.includes('renovation');
      }
      return pCat === catLower;
    });
  }

  // 4. Search query filtering
  if (search) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(search) || 
      p.location.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      p.clientName.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    );
  }

  // 5. Pagination support
  if (limit > 0) {
    const pageNumber = Math.max(1, page);
    const startIndex = (pageNumber - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < filtered.length;

    return NextResponse.json({
      success: true,
      data: paginated,
      total: filtered.length,
      page: pageNumber,
      limit: limit,
      hasMore: hasMore
    });
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
    hasMore: false
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = getStore();

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: body.title || 'Untitled Project',
      slug: (body.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: body.category || 'Residential Interiors',
      description: body.description || '',
      location: body.location || '',
      clientName: body.clientName || 'Private Client',
      year: body.year || new Date().getFullYear().toString(),
      areaSqFt: Number(body.areaSqFt) || 2500,
      coverImage: body.coverImage || '/images/projects/living-room.jpg',
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [body.coverImage || '/images/projects/living-room.jpg'],
      featured: Boolean(body.featured),
      status: body.status || 'Published',
      displayOrder: Number(body.displayOrder) || store.projects.length + 1,
      seoTitle: body.seoTitle || body.title,
      seoDesc: body.seoDesc || body.description?.slice(0, 160),
      createdAt: new Date().toISOString()
    };

    store.projects.unshift(newProject);
    recalculateStats();

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid project payload' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const store = getStore();

    const index = store.projects.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    store.projects[index] = {
      ...store.projects[index],
      ...updates
    };

    recalculateStats();
    return NextResponse.json({ success: true, data: store.projects[index] });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
  }

  const store = getStore();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter(p => p.id !== id);

  if (store.projects.length === initialLength) {
    return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
  }

  recalculateStats();
  return NextResponse.json({ success: true, message: 'Project deleted successfully' });
}
