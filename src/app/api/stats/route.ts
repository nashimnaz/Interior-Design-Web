import { NextResponse } from 'next/server';
import { getStore, recalculateStats } from '@/lib/dataService';

export async function GET() {
  const stats = recalculateStats();
  const store = getStore();

  return NextResponse.json({
    success: true,
    data: {
      ...stats,
      recentEnquiries: store.enquiries.slice(0, 5),
      recentProjects: store.projects.slice(0, 4),
      recentBlogs: store.blogs.slice(0, 3)
    }
  });
}
