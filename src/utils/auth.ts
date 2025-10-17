import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Enable Google only when credentials are provided to avoid runtime errors
const isGoogleEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

// Ensure Better Auth tables exist by applying migrations on first run
function ensureAuthSchema(database: Database.Database) {
  try {
    const hasUserTable = database
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='user'")
      .get();
    if (!hasUserTable) {
      const migrationsDir = path.join(process.cwd(), "better-auth_migrations");
      if (fs.existsSync(migrationsDir)) {
        const migrationFiles = fs
          .readdirSync(migrationsDir)
          .filter((f) => f.endsWith(".sql"))
          .sort();
        for (const file of migrationFiles) {
          const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
          database.exec(sql);
        }
      }
    }
  } catch (error) {
    console.error("Failed to ensure Better Auth schema:", error);
  }
}

// Reuse a single DB instance across HMR and server instances
declare global {
  // eslint-disable-next-line no-var
  var __BETTER_AUTH_DB__: Database.Database | undefined;
}

function getAuthDb() {
  if (global.__BETTER_AUTH_DB__) {
    return global.__BETTER_AUTH_DB__;
  }

  // Use /tmp on Vercel/serverless, local path otherwise
  const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;
  const dbPath = isVercel
    ? "/tmp/auth.db"
    : process.env.BETTER_AUTH_DB_PATH ||
      process.env.AUTH_DB_PATH ||
      path.join(process.cwd(), "data", "auth.db");

  // Ensure the directory exists
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      console.warn("Could not create database directory:", err);
      // Continue anyway, /tmp should exist on serverless
    }
  }

  const db = new Database(dbPath);
  try {
    // Improve concurrency on SQLite (skip WAL mode on serverless)
    if (!isVercel) {
      db.pragma("journal_mode = WAL");
    }
  } catch (_) {
    // no-op if pragma fails
  }

  ensureAuthSchema(db);
  global.__BETTER_AUTH_DB__ = db;
  return db;
}

const authDb = getAuthDb();

export const auth = betterAuth({
  database: authDb,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    // Ensure sign-up does not try to send verification emails unless configured
    requireEmailVerification: false,
  },
  google: {
    enabled: isGoogleEnabled,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});

