import { z } from 'zod';
import { handle, ok, parseBody } from '@/lib/server/http';
import { store } from '@/lib/server/store';

const schema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
});

export const POST = handle(async (request: Request) => {
  const { email } = await parseBody(request, schema);
  const existing = await store.findOne('subscribers', { email });
  if (!existing) await store.insert('subscribers', { email });
  return ok({ email, alreadySubscribed: Boolean(existing) });
});
