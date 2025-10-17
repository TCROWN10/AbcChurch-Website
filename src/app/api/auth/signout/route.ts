import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Back-compat alias: POST /api/auth/signout -> POST /api/auth/sign-out
export async function POST(request: NextRequest) {
  const url = new URL('/api/auth/sign-out', request.url);
  return NextResponse.redirect(url, 307);
}

