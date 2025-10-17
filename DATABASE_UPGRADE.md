# Database Upgrade Guide - SQLite to Production Database

## ⚠️ CRITICAL: SQLite Limitations on Vercel

Your site is currently using **SQLite** for the authentication database, which has serious limitations in production:

### Problems with SQLite on Vercel:
- ❌ **Data loss**: The `/tmp` directory is ephemeral - all user accounts will be lost on every deployment
- ❌ **Cold starts**: Each serverless function instance gets its own database copy
- ❌ **Not scalable**: Can't handle multiple regions or high traffic
- ❌ **Read-only filesystem**: Vercel's filesystem is mostly read-only

### Current Status:
- ✅ **Temporary fix applied**: Using `/tmp/auth.db` so auth works
- ⚠️ **Not production-ready**: Users will lose accounts between deployments

---

## Solution: Upgrade to Vercel Postgres

The easiest and best solution is to use **Vercel Postgres** (built-in, free tier available).

### Option 1: Vercel Postgres (Recommended)

#### Step 1: Create Database in Vercel

1. **Go to your Vercel project dashboard**
2. **Click "Storage" tab**
3. **Click "Create Database"**
4. **Select "Postgres"**
5. **Choose "Hobby" plan** (free for small sites)
6. **Click "Create"**
7. **Copy the environment variables** that Vercel provides:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

#### Step 2: Install Required Packages

```bash
cd /Users/MAC/Downloads/AbcChurch-Website-main
npm install @better-auth/postgres @neondatabase/serverless
```

#### Step 3: Update Better Auth Configuration

Replace the SQLite configuration in `src/utils/auth.ts`:

**Before (SQLite):**
```typescript
import Database from "better-sqlite3";

const db = new Database(dbPath);

export const auth = betterAuth({
  database: authDb,
  // ...
});
```

**After (Postgres):**
```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.POSTGRES_URL!);
const db = drizzle(sql);

export const auth = betterAuth({
  database: {
    provider: 'postgres',
    url: process.env.POSTGRES_URL!,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  google: {
    enabled: isGoogleEnabled,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});
```

#### Step 4: Run Migrations

Better Auth will auto-create tables on first run, or you can manually run migrations.

#### Step 5: Remove SQLite Dependencies

```bash
npm uninstall better-sqlite3
```

#### Step 6: Deploy

```bash
git add .
git commit -m "Upgrade to Vercel Postgres for production database"
git push origin main
```

Vercel will automatically redeploy with the new database!

---

### Option 2: Supabase (Alternative)

If you prefer Supabase (includes auth + database + storage):

#### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Create a new project
3. Copy the **Database URL** from Settings → Database

#### Step 2: Install Packages

```bash
npm install @better-auth/postgres @neondatabase/serverless
```

#### Step 3: Add Environment Variable

In Vercel:
```bash
POSTGRES_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT].supabase.co:5432/postgres
```

#### Step 4: Update `src/utils/auth.ts`

Same as Option 1 above.

---

### Option 3: Keep SQLite (NOT RECOMMENDED)

If you absolutely must use SQLite:

⚠️ **WARNING**: Users will lose their accounts on every deployment!

The current fix uses `/tmp/auth.db` which is temporary storage. This is **only suitable for testing**, not production.

**Limitations:**
- All user accounts deleted on every deployment
- Data lost on serverless function cold starts
- Not suitable for real users
- Can't scale to multiple regions

**Only use this if:**
- Testing/demo purposes only
- Willing to manually backup/restore database
- Very low traffic (single user testing)

---

## Migration Path

### If You Already Have Users on SQLite:

You'll need to export users before upgrading:

#### Export SQLite Users:

```bash
# On your local machine
cd /Users/MAC/Downloads/AbcChurch-Website-main
sqlite3 data/auth.db "SELECT * FROM user;" > users_backup.csv
```

#### Import to Postgres:

After setting up Postgres, manually import users or create a migration script.

---

## Quick Comparison

| Feature | SQLite (Current) | Vercel Postgres | Supabase |
|---------|------------------|-----------------|----------|
| **Cost** | Free | Free tier | Free tier |
| **Setup** | Easy | Easy | Easy |
| **Data Persistence** | ❌ Lost on deploy | ✅ Persistent | ✅ Persistent |
| **Scalability** | ❌ Poor | ✅ Excellent | ✅ Excellent |
| **Production Ready** | ❌ No | ✅ Yes | ✅ Yes |
| **Backup** | Manual | Automatic | Automatic |
| **Multi-region** | ❌ No | ✅ Yes | ✅ Yes |

---

## Recommended Action Plan

### **Immediate (This Week):**
✅ Keep the temporary SQLite fix (already applied)  
✅ Test that authentication works  
⚠️ **Warning users**: Accounts may be lost between deployments  

### **Short-term (Next 1-2 Weeks):**
1. ✅ Create Vercel Postgres database
2. ✅ Update Better Auth configuration
3. ✅ Test authentication with Postgres locally
4. ✅ Deploy to production
5. ✅ Verify users can create accounts that persist

### **Before Launch:**
❗ **MUST upgrade to Postgres before accepting real users**  
❗ SQLite in `/tmp` is NOT production-ready  

---

## Need Help?

If you need assistance with the migration:
1. Follow Option 1 (Vercel Postgres) - easiest path
2. The migration is relatively simple (30-60 minutes)
3. Test locally first before deploying

---

## Current Status Summary

✅ **Fixed**: Authentication endpoints now work  
⚠️ **Temporary**: Using SQLite in `/tmp` (ephemeral storage)  
❌ **Not Production Ready**: Will lose user data on deployments  
🔄 **Next Step**: Upgrade to Vercel Postgres (see Option 1 above)  

**Estimated Time to Upgrade**: 30-60 minutes  
**Difficulty**: Medium (requires code changes)  
**Impact**: HIGH - Required for production use  

