import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to the ABC Church backend API
    const response = await fetch(`${API_BASE_URL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Return the response with the same status code
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Registration proxy error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Registration failed. Please try again.',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

