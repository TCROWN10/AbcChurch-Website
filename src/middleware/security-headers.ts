import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function securityHeaders(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== 'production';
  const csp = [
    "default-src 'self'",
    // Allow inline scripts for Next.js to work properly
    // In development, also allow eval for HMR
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob:"
      : "script-src 'self' 'unsafe-inline' blob:",
    // Allow inline styles from Tailwind/Next
    "style-src 'self' 'unsafe-inline'",
    // Permit images from all HTTPS sources
    "img-src 'self' data: https: http:",
    // Fonts
    "font-src 'self' data:",
    // Allow connections to Stripe, Google OAuth, and other APIs
    isDev
      ? "connect-src 'self' ws: wss: http: https:"
      : "connect-src 'self' https://api.stripe.com https://js.stripe.com https://*.stripe.com https://accounts.google.com https://*.googleapis.com",
    // Allow Stripe and Google OAuth iframes/popups
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://accounts.google.com https://www.google.com",
    "frame-ancestors 'none'",
    "form-action 'self' https://checkout.stripe.com https://accounts.google.com",
    "base-uri 'self'",
    "object-src 'none'",
  ].join('; ');

  const response = NextResponse.next();
  
  // Security Headers
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // CORS Headers
  const origin = request.headers.get('origin');
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  
  if (origin && (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development')) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-V'
    );
  }

  return response;
}
