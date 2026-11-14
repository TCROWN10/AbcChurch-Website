/**
 * Legacy SQLite helpers (better-sqlite3) were removed so Vercel deploys can succeed.
 * Auth and CMS now use Postgres / the document store in `src/lib/server/store.ts`.
 */

function unavailable(name: string): never {
  throw new Error(
    `${name} is no longer available. Use the Postgres-backed store APIs instead of the old SQLite wrapper.`
  );
}

export function getUserDb() {
  return unavailable('getUserDb');
}

export function getSessionDb() {
  return unavailable('getSessionDb');
}

export function getDatabase() {
  return unavailable('getDatabase');
}

export function getPrayerRequestDb() {
  return unavailable('getPrayerRequestDb');
}
