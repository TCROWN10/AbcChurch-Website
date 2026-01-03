import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    
    // Build the backend OAuth URL with all query parameters
    const backendOAuthUrl = new URL(`${BACKEND_API_URL}/api/auth/google/super-admin`);
    searchParams.forEach((value, key) => {
      backendOAuthUrl.searchParams.append(key, value);
    });

    // Redirect to the backend OAuth endpoint
    return NextResponse.redirect(backendOAuthUrl.toString(), { status: 302 });
  } catch (error: any) {
    console.error('Error in /api/auth/google/super-admin proxy:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'OAuth redirect failed',
        details: error.message,
        statusCode: 500
      },
      { status: 500 }
    );
  }
}

