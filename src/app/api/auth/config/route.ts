import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if Google OAuth is enabled
    const isGoogleEnabled = Boolean(
      process.env.GOOGLE_CLIENT_ID && 
      process.env.GOOGLE_CLIENT_SECRET
    );

    return NextResponse.json({
      googleEnabled: isGoogleEnabled,
    });
  } catch (error: any) {
    console.error('Error in /api/auth/config:', error);
    return NextResponse.json(
      { googleEnabled: false },
      { status: 200 }
    );
  }
}

