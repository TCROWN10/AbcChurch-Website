import 'server-only';
import { store } from './store';

/** Church staff accounts that must always be able to open /admin. */
export const CHURCH_ADMIN_ACCOUNTS = [
  {
    email: 'emmaobolaji@gmail.com',
    firstName: 'Emmanuel',
    lastName: 'Bolaji',
  },
  {
    email: 'abcchurchhq@gmail.com',
    firstName: 'ABC',
    lastName: 'Church',
  },
] as const;

export const CHURCH_ADMIN_EMAILS = CHURCH_ADMIN_ACCOUNTS.map(a => a.email);

/** bcrypt hash for Abcchurch12345 — used only to provision the church admin accounts. */
const CHURCH_ADMIN_PASSWORD_HASH =
  '$2b$10$6zFIewf6ou6FFExP86CAxeKmLSPjrF5Q3awER0MQ2dtUHNZIkQbO2';

const SEED_FLAG = 'seeded:v3:church-admins-2026-05';

let pending: Promise<void> | null = null;

/**
 * Ensures the church HQ / pastor admin accounts exist with the shared password
 * and SUPER_ADMIN role. Safe to call on every login — runs once per database.
 */
export async function ensureChurchAdmins() {
  if (!pending) {
    pending = (async () => {
      if (await store.getFlag(SEED_FLAG)) return;

      const now = new Date().toISOString();
      for (const account of CHURCH_ADMIN_ACCOUNTS) {
        const existing = await store.findOne('users', { email: account.email });
        if (existing) {
          await store.update('users', existing.id, {
            firstName: account.firstName,
            lastName: account.lastName,
            passwordHash: CHURCH_ADMIN_PASSWORD_HASH,
            role: 'SUPER_ADMIN',
          });
        } else {
          await store.insert(
            'users',
            {
              email: account.email,
              firstName: account.firstName,
              lastName: account.lastName,
              passwordHash: CHURCH_ADMIN_PASSWORD_HASH,
              role: 'SUPER_ADMIN',
              lastLoginAt: now,
            },
            now
          );
        }
      }

      await store.setFlag(SEED_FLAG, now);
    })().finally(() => {
      pending = null;
    });
  }
  await pending;
}
