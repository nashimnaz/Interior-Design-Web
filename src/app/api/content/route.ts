import { NextResponse } from 'next/server';
import { getStore, saveStoreToDisk } from '@/lib/dataService';
import { initialPageContent } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  const store = getStore();
  const pageContent = store.pageContent || initialPageContent;

  if (page && (page === 'home' || page === 'about' || page === 'contact')) {
    return NextResponse.json({
      success: true,
      data: pageContent[page],
    });
  }

  return NextResponse.json({
    success: true,
    data: pageContent,
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const store = getStore();

    if (!store.pageContent) {
      store.pageContent = { ...initialPageContent };
    }

    // Support updating a single section (e.g. { page: 'home', data: {...} }) or all
    if (body.page && (body.page === 'home' || body.page === 'about' || body.page === 'contact')) {
      store.pageContent[body.page as 'home' | 'about' | 'contact'] = {
        ...store.pageContent[body.page as 'home' | 'about' | 'contact'],
        ...body.data,
      };
    } else {
      store.pageContent = {
        ...store.pageContent,
        ...body,
      };
    }

    saveStoreToDisk();

    return NextResponse.json({
      success: true,
      data: store.pageContent,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update page content' },
      { status: 400 }
    );
  }
}
