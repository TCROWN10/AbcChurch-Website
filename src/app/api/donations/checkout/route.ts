import { z } from 'zod';
import { getCurrentUser, HttpError } from '@/lib/server/auth';
import { createDonationCheckout } from '@/lib/server/donations';
import { handle, ok, parseBody } from '@/lib/server/http';

const CATEGORIES = ['Tithes', 'Offerings', 'Building Fund', 'Missions'] as const;

const schema = z.object({
  amount: z.number().min(1, 'The minimum gift is $1.00').max(100000),
  category: z.enum(CATEGORIES),
  isRecurring: z.boolean(),
  frequency: z.enum(['weekly', 'monthly', 'yearly']).optional(),
  email: z.string().trim().toLowerCase().email('Enter a valid email address').optional(),
  name: z.string().trim().max(120).optional(),
});

export const POST = handle(async (request: Request) => {
  const input = await parseBody(request, schema);
  const user = await getCurrentUser();
  const donorEmail = input.email || user?.email;
  if (!donorEmail) throw new HttpError(400, 'Email is required so we can send your receipt.');
  if (input.isRecurring && !input.frequency) throw new HttpError(400, 'Choose how often to give.');

  const url = await createDonationCheckout({
    amount: Math.round(input.amount * 100) / 100,
    category: input.category,
    isRecurring: input.isRecurring,
    frequency: input.frequency,
    donorEmail,
    donorName: input.name || (user ? `${user.firstName} ${user.lastName}`.trim() : undefined),
    userId: user?.id,
    origin: new URL(request.url).origin,
  });
  if (!url) throw new HttpError(502, 'Stripe did not return a checkout link. Please try again.');
  return ok({ url });
});
