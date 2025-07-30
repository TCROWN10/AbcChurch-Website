import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth-utils';

export async function POST() {
  try {
    await removeAuthCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}