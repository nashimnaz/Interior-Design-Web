import { NextResponse } from 'next/server';
import { getStore } from '@/lib/dataService';
import { NewsletterSubscriber } from '@/lib/types';

export async function GET() {
  const store = getStore();
  return NextResponse.json({
    success: true,
    data: store.subscribers || [],
    total: store.subscribers?.length || 0
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const store = getStore();
    if (!store.subscribers) {
      store.subscribers = [];
    }

    // Prevent duplicate active subscriptions
    const existingIndex = store.subscribers.findIndex(s => s.email.toLowerCase() === email);
    if (existingIndex !== -1) {
      if (store.subscribers[existingIndex].status === 'Active') {
        return NextResponse.json(
          { success: true, message: 'You are already subscribed to our newsletter.', alreadySubscribed: true },
          { status: 200 }
        );
      } else {
        // Re-activate
        store.subscribers[existingIndex].status = 'Active';
        store.subscribers[existingIndex].subscribedAt = new Date().toISOString();
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          data: store.subscribers[existingIndex]
        });
      }
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
      status: 'Active'
    };

    store.subscribers.unshift(newSubscriber);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing to EXCORTO Design Journal.',
        data: newSubscriber
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process newsletter subscription.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    const store = getStore();
    if (!store.subscribers) store.subscribers = [];

    const index = store.subscribers.findIndex(s => s.id === id || s.email === email);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Subscriber not found' }, { status: 404 });
    }

    const removed = store.subscribers.splice(index, 1)[0];
    return NextResponse.json({ success: true, data: removed });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to remove subscriber' }, { status: 500 });
  }
}
