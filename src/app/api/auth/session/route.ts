import { getCurrentUser, toPublicUser } from '@/lib/server/auth';
import { handle, ok } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

export const GET = handle(async () => {
  const user = await getCurrentUser();
  return ok(user ? toPublicUser(user) : null);
});
