import { NextResponse } from 'next/server';
import { getStore } from '@/lib/dataService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const store = getStore();

    const blogIndex = store.blogs.findIndex(
      b => b.slug.toLowerCase() === slug.toLowerCase()
    );

    if (blogIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // Increment view count on retrieval
    store.blogs[blogIndex].views = (store.blogs[blogIndex].views || 0) + 1;
    const article = store.blogs[blogIndex];

    // Find 3 related articles (published only, matching category or tags, excluding current)
    const related = store.blogs
      .filter(
        b => b.id !== article.id && b.status === 'Published'
      )
      .map(b => {
        let score = 0;
        if (b.category === article.category) score += 3;
        const sharedTags = b.tags.filter(t => article.tags.includes(t));
        score += sharedTags.length;
        return { blog: b, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.blog);

    return NextResponse.json({
      success: true,
      data: article,
      related
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve article' },
      { status: 500 }
    );
  }
}
