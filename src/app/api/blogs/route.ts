import { NextResponse } from 'next/server';
import { getStore, recalculateStats } from '@/lib/dataService';
import { BlogPost } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category') || 'All';
  const status = searchParams.get('status') || 'All';
  const popular = searchParams.get('popular') === 'true';
  const featured = searchParams.get('featured') === 'true';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : null;

  const store = getStore();
  let filtered = [...store.blogs];

  // Search filter
  if (search) {
    filtered = filtered.filter(b => 
      b.title.toLowerCase().includes(search) || 
      b.excerpt.toLowerCase().includes(search) ||
      b.content.toLowerCase().includes(search) ||
      b.author.toLowerCase().includes(search) ||
      b.tags.some(t => t.toLowerCase().includes(search))
    );
  }

  // Category filter
  if (category && category !== 'All' && category !== 'All Articles') {
    filtered = filtered.filter(b => b.category === category);
  }

  // Status filter (Default to Published for public queries if not specified)
  if (status && status !== 'All') {
    filtered = filtered.filter(b => b.status === status);
  }

  // Featured filter
  if (featured) {
    filtered = filtered.filter(b => b.featured === true);
  }

  // Popular sort (by view count)
  if (popular) {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  const total = filtered.length;
  let data = filtered;

  if (limit && limit > 0) {
    const startIndex = (page - 1) * limit;
    data = filtered.slice(startIndex, startIndex + limit);
  }

  return NextResponse.json({
    success: true,
    data,
    total,
    page,
    limit: limit || total,
    totalPages: limit ? Math.ceil(total / limit) : 1,
    hasMore: limit ? page * limit < total : false
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const store = getStore();

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: body.title || 'Untitled Article',
      slug: (body.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: body.excerpt || '',
      content: body.content || '',
      coverImage: body.coverImage || '/images/blogs/trends-2026.jpg',
      category: body.category || 'Design Trends',
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(',').map((t: string) => t.trim()) : ['Interior Design']),
      author: body.author || 'Studio Principal',
      authorRole: body.authorRole || 'Design Director',
      readTime: body.readTime || '5 min read',
      status: body.status || 'Published',
      publishedAt: new Date().toISOString(),
      seoTitle: body.seoTitle || body.title,
      seoDesc: body.seoDesc || body.excerpt?.slice(0, 160),
      views: 0
    };

    store.blogs.unshift(newBlog);
    recalculateStats();

    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid blog payload' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const store = getStore();

    const index = store.blogs.findIndex(b => b.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    store.blogs[index] = {
      ...store.blogs[index],
      ...updates
    };

    recalculateStats();
    return NextResponse.json({ success: true, data: store.blogs[index] });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
  }

  const store = getStore();
  const initialLength = store.blogs.length;
  store.blogs = store.blogs.filter(b => b.id !== id);

  if (store.blogs.length === initialLength) {
    return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
  }

  recalculateStats();
  return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
}
