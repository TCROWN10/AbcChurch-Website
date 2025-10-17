import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use the current origin in the browser to avoid cross-origin/port mismatches
  baseURL: typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  session: {
    // Enable session handling
    enable: true,
    // Set cookie options
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    }
  },
  // Add any additional configuration here
});
