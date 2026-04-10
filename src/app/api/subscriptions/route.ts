import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

/**
 * Recurring donation subscriptions — proxied to Nest `GET /api/donations/subscriptions`.
 * Requires Super Admin JWT (same as backend). Query params:
 * - subscriptionId: single Stripe subscription id
 * - status, category, customerEmail: list filters
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const searchParams = request.nextUrl.searchParams;
    const backendUrl = new URL(`${BACKEND_URL}/api/donations/subscriptions`);
    searchParams.forEach((value, key) => {
      backendUrl.searchParams.append(key, value);
    });

    const headers: HeadersInit = {
      accept: 'application/json',
    };
    if (authHeader) {
      headers.authorization = authHeader;
    }

    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await response.text();
      return NextResponse.json(
        { error: 'Unexpected response from subscriptions API', details: text.slice(0, 200) },
        { status: response.status || 502 },
      );
    }

    const json = (await response.json()) as Record<string, unknown>;

    if (!response.ok) {
      return NextResponse.json(json, { status: response.status });
    }

    const payload = json.data as Record<string, unknown> | unknown[] | null | undefined;

    if (payload && typeof payload === 'object' && !Array.isArray(payload) && 'total' in payload && 'data' in payload) {
      const inner = payload as { data: unknown; total: number };
      return NextResponse.json({ data: inner.data, total: inner.total }, { status: 200 });
    }

    return NextResponse.json(payload ?? json, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Subscriptions proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve subscriptions', message },
      { status: 500 },
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
