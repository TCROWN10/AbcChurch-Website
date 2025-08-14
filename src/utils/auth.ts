import {betterAuth} from "better-auth";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Enable Google only when credentials are provided to avoid runtime errors
const isGoogleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

// Ensure Better Auth tables exist in ./auth.db by applying migrations on first run
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

const authDb = new Database("./auth.db");
ensureAuthSchema(authDb);

export const auth = betterAuth({
    database: authDb,
    emailAndPassword: {
        enabled: true,
        // Ensure sign-up does not try to send verification emails unless configured
        requireEmailVerification: false,
    },
    google: {
        enabled: isGoogleEnabled,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
})

