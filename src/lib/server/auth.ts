import 'server-only';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import type { PublicUser, Role, UserRecord } from '@/lib/content-types';
import { getAdminEmails, getAuthSecret } from './config';
import { store } from './store';

export const SESSION_COOKIE = 'abc_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function toPublicUser(user: UserRecord): PublicUser {
  const { passwordHash: _hash, ...rest } = user;
  return rest;
}

export const isAdminRole = (role?: Role) => role === 'ADMIN' || role === 'SUPER_ADMIN';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/**
 * Emails in ADMIN_EMAILS are always super admins. When ADMIN_EMAILS is empty,
 * the very first account becomes super admin so a fresh install can be managed.
 */
export async function roleForNewUser(email: string): Promise<Role> {
  const adminEmails = getAdminEmails();
  if (adminEmails.length > 0) {
    return adminEmails.includes(email) ? 'SUPER_ADMIN' : 'MEMBER';
  }
  const existing = await store.list('users', { limit: 1 });
  return existing.length === 0 ? 'SUPER_ADMIN' : 'MEMBER';
}

export async function createSession(user: UserRecord) {
  const token = jwt.sign({ sub: user.id }, getAuthSecret(), { expiresIn: SESSION_MAX_AGE });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<UserRecord | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, getAuthSecret()) as { sub?: string };
    if (!payload.sub) return null;
    const user = await store.get('users', payload.sub);
    if (!user) return null;
    if (getAdminEmails().includes(user.email) && user.role !== 'SUPER_ADMIN') {
      return (await store.update('users', user.id, { role: 'SUPER_ADMIN' })) ?? user;
    }
    return user;
  } catch {
    return null;
  }
}

export async function requireUser(): Promise<UserRecord> {
  const user = await getCurrentUser();
  if (!user) throw new HttpError(401, 'Please sign in to continue.');
  return user;
}

export async function requireAdmin(): Promise<UserRecord> {
  const user = await requireUser();
  if (!isAdminRole(user.role)) throw new HttpError(403, 'Admin access required.');
  return user;
}

export async function requireSuperAdmin(): Promise<UserRecord> {
  const user = await requireUser();
  if (user.role !== 'SUPER_ADMIN') throw new HttpError(403, 'Super admin access required.');
  return user;
}
