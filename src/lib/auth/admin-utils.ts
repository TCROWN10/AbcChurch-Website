import { auth } from '@/utils/auth';
import { getUserDb } from '@/lib/database/database-wrapper';
import { headers } from 'next/headers';

/**
 * Get the current session from better-auth
 */
export async function getServerSession() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return false;
    }

    const userDb = getUserDb();
    const user = userDb.findById(session.user.id);
    
    return user?.isAdmin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Get the current user with admin status
 */
export async function getCurrentUser() {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return null;
    }

    const userDb = getUserDb();
    const user = userDb.findById(session.user.id);
    
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: Boolean(user.isAdmin),
      isGuest: Boolean(user.isGuest),
      emailVerified: Boolean(user.emailVerified),
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Require admin access - throws error if user is not admin
 * Use this in server components, API routes, or server actions
 */
export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
}

