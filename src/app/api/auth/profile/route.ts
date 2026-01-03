import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

export async function GET(request: NextRequest) {
  try {
    // Check if this is an OAuth callback (Google OAuth redirects to this endpoint)
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth callback - redirect to appropriate OAuth endpoint
    if (code || state || error) {
      // Determine which OAuth endpoint to redirect to based on state or default to user OAuth
      const oauthType = state?.includes('admin') 
        ? (state.includes('super-admin') ? 'super-admin' : 'admin')
        : 'user';
      
      const oauthEndpoint = oauthType === 'super-admin' 
        ? '/api/auth/google/super-admin'
        : oauthType === 'admin'
        ? '/api/auth/google/admin'
        : '/api/auth/google';

      // Build redirect URL with query parameters
      const redirectUrl = new URL(`${BACKEND_API_URL}${oauthEndpoint}`);
      searchParams.forEach((value, key) => {
        redirectUrl.searchParams.append(key, value);
      });

      return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
    }

    // Get JWT token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;

    // If no token, return 401
    if (!token) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Unauthorized - Missing JWT token',
          statusCode: 401 
        },
        { status: 401 }
      );
    }

    // Forward request to backend API with token
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
    });

    const data = await backendResponse.json();

    // Return the response with the same status code
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error: any) {
    console.error('Error in /api/auth/profile proxy:', error);
    
    // If it's a network error and we have OAuth params, still try to redirect
    const searchParams = request.nextUrl.searchParams;
    if (searchParams.get('code') || searchParams.get('state')) {
      const oauthEndpoint = '/api/auth/google';
      const redirectUrl = new URL(`${BACKEND_API_URL}${oauthEndpoint}`);
      searchParams.forEach((value, key) => {
        redirectUrl.searchParams.append(key, value);
      });
      return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
    }

    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error',
        details: error.message,
        statusCode: 500
      },
      { status: 500 }
    );
  }
}

