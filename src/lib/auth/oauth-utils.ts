import { generateSecureToken } from './auth-utils';

// OAuth configuration
interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

// Google user profile interface
export interface GoogleUserProfile {
  id: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email_verified: boolean;
}

// OAuth state management
const oauthStates = new Map<string, { timestamp: number; redirectUrl?: string }>();

export function generateOAuthState(redirectUrl?: string): string {
  const state = generateSecureToken();
  oauthStates.set(state, {
    timestamp: Date.now(),
    redirectUrl,
  });
  
  // Clean up old states (older than 10 minutes)
  cleanupExpiredStates();
  
  return state;
}

export function validateOAuthState(state: string): { isValid: boolean; redirectUrl?: string } {
  const stateData = oauthStates.get(state);
  if (!stateData) {
    return { isValid: false };
  }
  
  // Check if state is older than 10 minutes
  const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
  if (stateData.timestamp < tenMinutesAgo) {
    oauthStates.delete(state);
    return { isValid: false };
  }
  
  oauthStates.delete(state);
  return { isValid: true, redirectUrl: stateData.redirectUrl };
}

function cleanupExpiredStates() {
  const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
  for (const [state, data] of oauthStates.entries()) {
    if (data.timestamp < tenMinutesAgo) {
      oauthStates.delete(state);
    }
  }
}

export function getGoogleOAuthConfig(): GoogleOAuthConfig {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth credentials not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.');
  }
  
  return {
    clientId,
    clientSecret,
    redirectUri: `${baseUrl}/api/auth/google/callback`,
    scopes: ['openid', 'email', 'profile'],
  };
}

export function getGoogleOAuthUrl(state: string): string {
  const config = getGoogleOAuthConfig();
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: config.scopes.join(' '),
    state,
    access_type: 'offline',
    prompt: 'consent',
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  id_token: string;
  expires_in: number;
}> {
  const config = getGoogleOAuthConfig();
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUri,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to exchange code for tokens: ${error}`);
  }
  
  return response.json();
}

export async function getGoogleUserProfile(accessToken: string): Promise<GoogleUserProfile> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch user profile: ${error}`);
  }
  
  return response.json();
}

export function parseGoogleUserProfile(profile: GoogleUserProfile) {
  return {
    email: profile.email,
    firstName: profile.given_name || profile.name?.split(' ')[0] || '',
    lastName: profile.family_name || profile.name?.split(' ').slice(1).join(' ') || '',
    profilePicture: profile.picture,
    emailVerified: profile.email_verified,
    oauthId: profile.id,
  };
}
