import { z } from 'zod';
import { createSession, HttpError, toPublicUser, verifyPassword } from '@/lib/server/auth';
import { getAdminEmails } from '@/lib/server/config';
import { handle, ok, parseBody } from '@/lib/server/http';
import { store } from '@/lib/server/store';

const schema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const POST = handle(async (request: Request) => {
  const { email, password } = await parseBody(request, schema);
  const user = await store.findOne('users', { email });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new HttpError(401, 'Incorrect email or password.');
  }
  const updated = await store.update('users', user.id, {
    lastLoginAt: new Date().toISOString(),
    ...(getAdminEmails().includes(email) ? { role: 'SUPER_ADMIN' as const } : {}),
  });
  await createSession(updated ?? user);
  return ok(toPublicUser(updated ?? user));
});
