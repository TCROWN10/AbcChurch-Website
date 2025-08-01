// Database-backed user storage with enhanced features
import { generateUserId, generateEmailVerificationToken, type User } from './auth-utils';
import { getUserDb } from './database-wrapper';

interface CreateUserData {
  email: string;
  firstName?: string;
  lastName?: string;
  hashedPassword?: string;
  isGuest: boolean;
  requireEmailVerification?: boolean;
}

export async function createUser(userData: CreateUserData): Promise<User> {
  const userDb = getUserDb();
  const id = generateUserId();
  const emailVerificationToken = userData.requireEmailVerification && !userData.isGuest 
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
import { sendEmail, generateEmailVerificationEmail, generatePasswordResetEmail } from './email-service';

async function sendEmailVerification(email: string, token: string): Promise<void> {
  const emailOptions = generateEmailVerificationEmail(email, token);
  await sendEmail(emailOptions);
}

async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const emailOptions = generatePasswordResetEmail(email, token);
  await sendEmail(emailOptions);
}