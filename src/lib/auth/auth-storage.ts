// Database-backed user storage with enhanced features
import { generateUserId, generateEmailVerificationToken, type User } from './auth-utils';
import { getUserDb } from '../database/database-wrapper';

interface CreateUserData {
  email: string;
  firstName?: string;
  lastName?: string;
  hashedPassword?: string;
  isGuest: boolean;
  requireEmailVerification?: boolean;
  // OAuth fields
  oauthProvider?: 'google' | 'facebook' | 'apple';
  oauthId?: string;
  profilePicture?: string;
}

export async function createUser(userData: CreateUserData): Promise<User> {
  const userDb = getUserDb();
  const id = generateUserId();
  const emailVerificationToken = userData.requireEmailVerification && !userData.isGuest && !userData.oauthProvider
    ? generateEmailVerificationToken() 
    : undefined;
  
  const user = userDb.create({
    id,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    hashedPassword: userData.hashedPassword,
    isGuest: userData.isGuest,
    emailVerificationToken,
    oauthProvider: userData.oauthProvider,
    oauthId: userData.oauthId,
    profilePicture: userData.profilePicture,
    // OAuth users are automatically verified
    emailVerified: userData.oauthProvider ? true : false,
  });
  
  // Send email verification if token was generated
  if (emailVerificationToken) {
    await sendEmailVerification(userData.email, emailVerificationToken);
  }
  
  return user;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const userDb = getUserDb();
  return userDb.findByEmail(email);
}

export async function findUserById(id: string): Promise<User | null> {
  const userDb = getUserDb();
  return userDb.findById(id);
}

export async function verifyEmail(token: string): Promise<boolean> {
  const userDb = getUserDb();
  const user = userDb.findByEmailVerificationToken(token);
  if (!user) return false;
  
  userDb.updateEmailVerification(user.id);
  return true;
}

export async function requestPasswordReset(email: string): Promise<string | null> {
  const userDb = getUserDb();
  const user = userDb.findByEmail(email);
  if (!user || user.isGuest) return null;
  
  const resetToken = generateEmailVerificationToken();
  const expires = Date.now() + (60 * 60 * 1000); // 1 hour
  
  userDb.updatePasswordResetToken(email, resetToken, expires);
  
  // Send password reset email
  await sendPasswordResetEmail(email, resetToken);
  
  return resetToken;
}

export async function resetPassword(token: string, newHashedPassword: string): Promise<boolean> {
  const userDb = getUserDb();
  const user = userDb.findByPasswordResetToken(token);
  if (!user) return false;
  
  userDb.updatePassword(user.id, newHashedPassword);
  return true;
}

// Email service functions
import { sendEmail, generateEmailVerificationEmail, generatePasswordResetEmail } from '../services/email-service';

async function sendEmailVerification(email: string, token: string): Promise<void> {
  const emailOptions = generateEmailVerificationEmail(email, token);
  await sendEmail(emailOptions);
}

async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const emailOptions = generatePasswordResetEmail(email, token);
  await sendEmail(emailOptions);
}

// OAuth-specific functions
export async function findUserByOAuth(provider: 'google' | 'facebook' | 'apple', oauthId: string): Promise<User | null> {
  const userDb = getUserDb();
  return userDb.findByOAuth ? userDb.findByOAuth(provider, oauthId) : null;
}

export async function createOAuthUser(userData: {
  email: string;
  firstName?: string;
  lastName?: string;
  oauthProvider: 'google' | 'facebook' | 'apple';
  oauthId: string;
  profilePicture?: string;
}): Promise<User> {
  return createUser({
    ...userData,
    isGuest: false,
    requireEmailVerification: false, // OAuth users are pre-verified
  });
}

export async function linkOAuthToExistingUser(
  userId: string, 
  provider: 'google' | 'facebook' | 'apple', 
  oauthId: string,
  profilePicture?: string
): Promise<boolean> {
  try {
    const userDb = getUserDb();
    if (userDb.linkOAuth) {
      userDb.linkOAuth(userId, provider, oauthId, profilePicture);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error linking OAuth account:', error);
    return false;
  }
}
