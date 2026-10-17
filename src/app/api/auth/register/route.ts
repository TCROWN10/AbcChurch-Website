import { z } from 'zod';
import { createSession, hashPassword, HttpError, roleForNewUser, toPublicUser } from '@/lib/server/auth';
import { handle, ok, parseBody } from '@/lib/server/http';
import { store } from '@/lib/server/store';

const schema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(60),
  lastName: z.string().trim().min(1, 'Last name is required').max(60),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200),
});

export const POST = handle(async (request: Request) => {
  const input = await parseBody(request, schema);
  if (await store.findOne('users', { email: input.email })) {
    throw new HttpError(409, 'An account with this email already exists. Please sign in instead.');
  }
  const now = new Date().toISOString();
  const user = await store.insert('users', {
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    passwordHash: await hashPassword(input.password),
    role: await roleForNewUser(input.email),
    lastLoginAt: now,
  });
  await createSession(user);
  return ok(toPublicUser(user), 201);
});
