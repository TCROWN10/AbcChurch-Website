import 'server-only';

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  bucket: process.env.SUPABASE_STORAGE_BUCKET || 'media',
};

export const isSupabaseEnabled = Boolean(supabaseConfig.url && supabaseConfig.serviceRoleKey);

export const postgresConfig = {
  url: process.env.DATABASE_URL ?? '',
};

export const isPostgresEnabled = Boolean(postgresConfig.url);

export type DatabaseKind = 'postgres' | 'supabase' | 'local';
export const databaseKind: DatabaseKind = isPostgresEnabled ? 'postgres' : isSupabaseEnabled ? 'supabase' : 'local';

/** Railway sets RAILWAY_VOLUME_MOUNT_PATH automatically when a volume is attached. */
const volumePath = process.env.RAILWAY_VOLUME_MOUNT_PATH ?? '';
export const uploadDir =
  process.env.UPLOAD_DIR ||
  (volumePath
    ? `${volumePath}/uploads`
    : process.env.VERCEL
      ? '/tmp/uploads'
      : `${process.cwd()}/data/uploads`);
export const hasPersistentUploads = isSupabaseEnabled || Boolean(process.env.UPLOAD_DIR || volumePath);

if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
  if (databaseKind === 'local') {
    console.warn(
      '[config] No database configured. Content is being saved to the local disk, which hosting platforms ' +
        'like Railway wipe on every deploy. Set DATABASE_URL (Railway Postgres) or the Supabase keys.'
    );
  }
  if (!hasPersistentUploads) {
    console.warn(
      '[config] Uploads are being saved to the local disk and will be lost on redeploy. ' +
        'Attach a Railway volume (or set UPLOAD_DIR / the Supabase keys).'
    );
  }
}

const DEV_AUTH_SECRET = 'dev-only-insecure-secret-change-me';

export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET must be set in production.');
  }
  return DEV_AUTH_SECRET;
}

/** Comma-separated list of emails that are always granted SUPER_ADMIN. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

export const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY ?? '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
};
