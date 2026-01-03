import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get JWT token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;

    // Build headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    };

    // Add authorization token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const backendResponse = await fetch(`${BACKEND_API_URL}/api/auth/admin`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error: any) {
    console.error('Error in /api/auth/admin proxy:', error);
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

