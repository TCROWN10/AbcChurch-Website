import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Stripe is handled by backend - this route can be used as a proxy or return an error
    return NextResponse.json(
      { error: 'Stripe checkout is handled by backend' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
