import { NextRequest, NextResponse } from 'next/server';
import { 
  validateOAuthState, 
  exchangeCodeForTokens, 
  getGoogleUserProfile, 
  parseGoogleUserProfile 
} from '@/lib/auth/oauth-utils';
import { 
  findUserByOAuth, 
  findUserByEmail, 
  createOAuthUser, 
  linkOAuthToExistingUser 
} from '@/lib/auth/auth-storage';
import { setAuthCookie } from '@/lib/auth/auth-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    
    // Handle OAuth errors
    if (error) {
      console.error('Google OAuth error:', error);
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('error', 'oauth_cancelled');
      return NextResponse.redirect(signInUrl);
    }
    
    // Validate required parameters
    if (!code || !state) {
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('error', 'invalid_oauth_response');
      return NextResponse.redirect(signInUrl);
    }
    
    // Validate OAuth state for security
    const stateValidation = validateOAuthState(state);
    if (!stateValidation.isValid) {
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('error', 'invalid_oauth_state');
      return NextResponse.redirect(signInUrl);
    }
    
    // Exchange authorization code for tokens
    const tokens = await exchangeCodeForTokens(code);
    
    // Get user profile from Google
    const googleProfile = await getGoogleUserProfile(tokens.access_token);
    const userProfile = parseGoogleUserProfile(googleProfile);
    
    // Check if user already exists with this OAuth provider
    let user = await findUserByOAuth('google', userProfile.oauthId);
    
    if (!user) {
      // Check if user exists with the same email
      const existingUser = await findUserByEmail(userProfile.email);
      
      if (existingUser) {
        // Link OAuth to existing account
        const linkSuccess = await linkOAuthToExistingUser(
          existingUser.id,
          'google',
          userProfile.oauthId,
          userProfile.profilePicture
        );
        
        if (linkSuccess) {
          user = { ...existingUser, oauthProvider: 'google' as const, oauthId: userProfile.oauthId };
        } else {
          // If linking fails, create a new account
          user = await createOAuthUser({
            email: userProfile.email,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            oauthProvider: 'google',
            oauthId: userProfile.oauthId,
            profilePicture: userProfile.profilePicture,
          });
        }
      } else {
        // Create new OAuth user
        user = await createOAuthUser({
          email: userProfile.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          oauthProvider: 'google',
          oauthId: userProfile.oauthId,
          profilePicture: userProfile.profilePicture,
        });
      }
    }
    
    // Set authentication cookie
    await setAuthCookie(user);
    
    // Redirect to the intended destination or home page
    const redirectUrl = stateValidation.redirectUrl || '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
    
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    
    // Redirect back to signin with error
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('error', 'oauth_failed');
    
    return NextResponse.redirect(signInUrl);
  }
}
