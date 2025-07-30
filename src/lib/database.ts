// Database configuration and connection
// This example uses SQLite for simplicity, but can be adapted for PostgreSQL, MySQL, etc.

import Database from 'better-sqlite3';
import { join } from 'path';

// Initialize database
const dbPath = join(process.cwd(), 'data', 'auth.db');
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    firstName TEXT,
    lastName TEXT,
    hashedPassword TEXT,
    isGuest BOOLEAN NOT NULL DEFAULT 0,
    emailVerified BOOLEAN NOT NULL DEFAULT 0,
    emailVerificationToken TEXT,
    passwordResetToken TEXT,
    passwordResetExpires INTEGER,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_email_verification_token ON users(emailVerificationToken);
  CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON users(passwordResetToken);

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    expiresAt INTEGER NOT NULL,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(userId);
  CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expiresAt);
`);

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  hashedPassword?: string;
  isGuest: boolean;
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

// User operations
export const userDb = {
  create: (userData: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    hashedPassword?: string;
    isGuest: boolean;
    emailVerificationToken?: string;
  }): User => {
    const now = Date.now();
    const stmt = db.prepare(`
      INSERT INTO users (
        id, email, firstName, lastName, hashedPassword, isGuest, 
        emailVerificationToken, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      userData.id,
      userData.email,
      userData.firstName || null,
      userData.lastName || null,
      userData.hashedPassword || null,
      userData.isGuest ? 1 : 0,
      userData.emailVerificationToken || null,
      now,
      now
    );

    return {
      ...userData,
      emailVerified: false,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };
  },

  findByEmail: (email: string): User | null => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const row = stmt.get(email) as any;
    
    if (!row) return null;
    
    return {
      ...row,
      isGuest: Boolean(row.isGuest),
      emailVerified: Boolean(row.emailVerified),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  },

  findById: (id: string): User | null => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(id) as any;
    
    if (!row) return null;
    
    return {
      ...row,
      isGuest: Boolean(row.isGuest),
      emailVerified: Boolean(row.emailVerified),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  },

  findByEmailVerificationToken: (token: string): User | null => {
    const stmt = db.prepare('SELECT * FROM users WHERE emailVerificationToken = ?');
    const row = stmt.get(token) as any;
    
    if (!row) return null;
    
    return {
      ...row,
      isGuest: Boolean(row.isGuest),
      emailVerified: Boolean(row.emailVerified),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  },

  findByPasswordResetToken: (token: string): User | null => {
    const stmt = db.prepare('SELECT * FROM users WHERE passwordResetToken = ? AND passwordResetExpires > ?');
    const row = stmt.get(token, Date.now()) as any;
    
    if (!row) return null;
    
    return {
      ...row,
      isGuest: Boolean(row.isGuest),
      emailVerified: Boolean(row.emailVerified),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  },

  updateEmailVerification: (id: string): void => {
    const stmt = db.prepare(`
      UPDATE users 
      SET emailVerified = 1, emailVerificationToken = NULL, updatedAt = ?
      WHERE id = ?
    `);
    stmt.run(Date.now(), id);
  },

  updatePasswordResetToken: (email: string, token: string, expires: number): void => {
    const stmt = db.prepare(`
      UPDATE users 
      SET passwordResetToken = ?, passwordResetExpires = ?, updatedAt = ?
      WHERE email = ?
    `);
    stmt.run(token, expires, Date.now(), email);
  },

  updatePassword: (id: string, hashedPassword: string): void => {
    const stmt = db.prepare(`
      UPDATE users 
      SET hashedPassword = ?, passwordResetToken = NULL, passwordResetExpires = NULL, updatedAt = ?
      WHERE id = ?
    `);
    stmt.run(hashedPassword, Date.now(), id);
  },
};

// Session operations
export const sessionDb = {
  create: (sessionData: {
    id: string;
    userId: string;
    expiresAt: Date;
  }): Session => {
    const now = Date.now();
    const stmt = db.prepare(`
      INSERT INTO sessions (id, userId, expiresAt, createdAt)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(
      sessionData.id,
      sessionData.userId,
      sessionData.expiresAt.getTime(),
      now
    );

    return {
      ...sessionData,
      createdAt: new Date(now),
    };
  },

  findById: (id: string): Session | null => {
    const stmt = db.prepare('SELECT * FROM sessions WHERE id = ? AND expiresAt > ?');
    const row = stmt.get(id, Date.now()) as any;
    
    if (!row) return null;
    
    return {
      ...row,
      expiresAt: new Date(row.expiresAt),
      createdAt: new Date(row.createdAt),
    };
  },

  delete: (id: string): void => {
    const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
    stmt.run(id);
  },

  deleteByUserId: (userId: string): void => {
    const stmt = db.prepare('DELETE FROM sessions WHERE userId = ?');
    stmt.run(userId);
  },

  cleanup: (): void => {
    const stmt = db.prepare('DELETE FROM sessions WHERE expiresAt <= ?');
    stmt.run(Date.now());
  },
};

// Cleanup expired sessions periodically
setInterval(() => {
  sessionDb.cleanup();
}, 1000 * 60 * 60); // Every hour

export default db;