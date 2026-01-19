import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

/**
 * Proxy route to forward requests to the backend API
 * This solves CORS issues by routing requests through Next.js server
 * Usage: /api/proxy/api/prayer-requests -> https://backend/api/prayer-requests
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams, 'PATCH');
}

async function proxyRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    // Reconstruct the path
    const path = params.path.join('/');
    const url = new URL(`${BACKEND_URL}/${path}`);
    
    // Log the request for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Proxy request:', {
        method,
        path,
        fullUrl: url.toString(),
        hasAuth: !!request.headers.get('authorization'),
      });
    }
    
    // Forward query parameters
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    // Get authorization header from request
    const authHeader = request.headers.get('authorization');
    
    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    };
    
    if (authHeader) {
      headers['authorization'] = authHeader;
    }

    // Get request body if it exists
    let body: string | undefined;
    if (method !== 'GET' && method !== 'DELETE') {
      try {
        body = await request.text();
      } catch (e) {
        // No body to read
      }
    }

    // Make request to backend
    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
    });

    // Get response data
    const contentType = response.headers.get('content-type');
    let data;
    
    try {
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        // Try to parse as JSON if text looks like JSON
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      data = { error: 'Failed to parse response' };
    }

    // Log error responses for debugging
    if (!response.ok) {
      console.error('Proxy received error response:', {
        status: response.status,
        statusText: response.statusText,
        url: url.toString(),
        data,
      });
    }

    // Return response with same status code (including error statuses)
    return NextResponse.json(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error: any) {
    console.error('Proxy error:', {
      error,
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });
    return NextResponse.json(
      { 
        error: 'Proxy request failed', 
        message: error?.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

