import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { userDb, sessionDb, type User } from './database';

const SALT_ROUNDS = 12;
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate secure random token
export function generateSecureToken(): string {
  return randomBytes(32).toString('hex');
}

// Generate user ID
export function generateUserId(): string {
  return randomBytes(16).toString('hex');
}

// Generate session ID
export function generateSessionId(): string {
  return randomBytes(32).toString('hex');
}

// Create session
export async function createSession(userId: string): Promise<string> {
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  sessionDb.create({
    id: sessionId,
    userId,
    expiresAt,
  });
  
  return sessionId;
}

// Set auth cookie with session
export async function setAuthCookie(user: User) {
  const sessionId = await createSession(user.id);
  const cookieStore = await cookies();
  
  cookieStore.set('session-id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
}

// Remove auth cookie and session
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session-id')?.value;
  
  if (sessionId) {
    sessionDb.delete(sessionId);
  }
  
  cookieStore.delete('session-id');
}

// Get current user from session
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session-id')?.value;
    
    if (!sessionId) return null;
    
    const session = sessionDb.findById(sessionId);
    if (!session) return null;
    
    const user = userDb.findById(session.userId);
    return user;
  } catch (error) {
    return null;
  }
}

// Verify session (for middleware)
export function verifySession(sessionId: string): { userId: string } | null {
  try {
    const session = sessionDb.findById(sessionId);
    if (!session) return null;
    
    return { userId: session.userId };
  } catch (error) {
    return null;
  }
}

// Generate email verification token
export function generateEmailVerificationToken(): string {
  return generateSecureToken();
}

// Generate password reset token
export function generatePasswordResetToken(): string {
  return generateSecureToken();
}