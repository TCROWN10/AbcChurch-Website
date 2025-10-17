import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityHeaders } from '@/middleware/security-headers';

export function middleware(request: NextRequest) {
  // Handle preflight requests with proper dynamic origin
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin') || '';
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    const allowOrigin =
      process.env.NODE_ENV === 'development' || (origin && allowedOrigins.includes(origin))
        ? origin
        : '';

    return new NextResponse(null, {
      status: 200,
      headers: {
        ...(allowOrigin ? { 'Access-Control-Allow-Origin': allowOrigin } : {}),
        'Vary': 'Origin',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // Apply security headers to all responses
  const response = securityHeaders(request);

  // Tighten CORS for auth API only when cross-origin
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const origin = request.headers.get('origin') || '';
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    const allowOrigin =
      process.env.NODE_ENV === 'development' || (origin && allowedOrigins.includes(origin))
        ? origin
        : '';

    if (allowOrigin) {
      response.headers.set('Access-Control-Allow-Origin', allowOrigin);
      response.headers.set('Vary', 'Origin');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
  }

  return response;
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
