import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Login proxy - Attempting to connect to:', `${API_BASE_URL}/api/auth/login`);
    console.log('Login proxy - Request body:', { email: body.email, password: '***' });
    
    // Forward the request to the ABC Church backend API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      
      // Log for debugging
      console.log('Login proxy - Backend response:', {
        status: response.status,
        ok: response.ok,
        data: data,
      });

      // Determine the correct status code
      // If backend returns 200 but response body indicates an error (401, etc.), use the body statusCode
      // Otherwise use the HTTP status from the backend
      let statusCode = response.status;
      if (data.statusCode && (data.statusCode !== response.status)) {
        // Backend returned error status in body but HTTP 200 - use the body statusCode
        statusCode = data.statusCode;
        console.log('Login proxy - Using statusCode from response body:', statusCode);
      }
      
      const responseData = {
        ...data,
        // Ensure statusCode is in the response body for client-side detection
        statusCode: data.statusCode || statusCode,
      };
      
      return NextResponse.json(responseData, { status: statusCode });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      // Handle fetch-specific errors
      if (fetchError.name === 'AbortError') {
        console.error('Login proxy - Request timeout');
        return NextResponse.json(
          { 
            success: false, 
            message: 'Request timeout. The backend server is taking too long to respond.',
            error: 'Request timeout',
            statusCode: 504
          },
          { status: 504 }
        );
      }
      
      // Network errors (DNS, connection refused, etc.)
      console.error('Login proxy - Fetch error:', {
        name: fetchError.name,
        message: fetchError.message,
        cause: fetchError.cause,
        stack: fetchError.stack
      });
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Unable to connect to the server. Please check your internet connection and try again.',
          error: fetchError.message || 'Network error',
          statusCode: 503
        },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error('Login proxy - General error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Login failed. Please try again.',
        error: error.message || 'Unknown error',
        statusCode: 500
      },
      { status: 500 }
    );
  }
}

