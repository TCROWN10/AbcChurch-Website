import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/donate', '/profile', '/dashboard'];
const authRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get('session-id')?.value;

  // Simple check - if there's a session cookie, consider user authenticated
  // The actual session validation will happen in the auth utilities when needed
  const isAuthenticated = !!sessionId;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users from protected routes to signin
  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - verify-email (email verification)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|verify-email).*)',
  ],
};