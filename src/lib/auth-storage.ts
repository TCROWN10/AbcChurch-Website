// Simple in-memory storage for demo purposes
// In production, use a proper database like PostgreSQL, MongoDB, etc.

import { User } from './auth-utils';

interface StoredUser extends User {
  hashedPassword?: string;
}

// In-memory user storage (replace with database in production)
const users: Map<string, StoredUser> = new Map();

export async function createUser(userData: {
  email: string;
  firstName?: string;
  lastName?: string;
  hashedPassword?: string;
  isGuest: boolean;
}): Promise<User> {
  const id = generateUserId();
  const user: StoredUser = {
    id,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    hashedPassword: userData.hashedPassword,
    isGuest: userData.isGuest,
    createdAt: new Date(),
  };
  
  users.set(id, user);
  
  // Return user without password
  const { hashedPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

export async function findUserById(id: string): Promise<User | null> {
  const user = users.get(id);
  if (!user) return null;
  
  // Return user without password
  const { hashedPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function generateUserId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}