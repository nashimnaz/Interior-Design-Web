import { NextResponse } from 'next/server';
import { getStore } from '@/lib/dataService';

export async function GET() {
  const store = getStore();
  return NextResponse.json({
    success: true,
    data: store.settings
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const store = getStore();

    store.settings = {
      ...store.settings,
      ...body
    };

    return NextResponse.json({
      success: true,
      data: store.settings
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 400 });
  }
}
