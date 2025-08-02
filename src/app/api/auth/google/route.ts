import { NextRequest, NextResponse } from 'next/server';
import { generateOAuthState, getGoogleOAuthUrl } from '@/lib/auth/oauth-utils';

export async function GET(request: NextRequest) {
  try {
    // Get redirect URL from query params (optional)
    const { searchParams } = new URL(request.url);
    const redirectUrl = searchParams.get('redirect');
    
    // Generate OAuth state for security
    const state = generateOAuthState(redirectUrl || undefined);
    
    // Get Google OAuth URL
    const oauthUrl = getGoogleOAuthUrl(state);
    
    // Redirect to Google OAuth
    return NextResponse.redirect(oauthUrl);
  } catch (error) {
    console.error('Google OAuth initiation error:', error);
    
    // Redirect back to signin with error
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('error', 'oauth_setup_failed');
    
    return NextResponse.redirect(signInUrl);
  }
}
