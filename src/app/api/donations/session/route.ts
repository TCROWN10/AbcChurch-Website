import type Stripe from 'stripe';
import { HttpError } from '@/lib/server/auth';
import { getStripe, markSessionPaid } from '@/lib/server/donations';
import { handle, ok } from '@/lib/server/http';

export const dynamic = 'force-dynamic';

const money = (cents: number | null, currency: string | null) =>
  cents == null
    ? null
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: (currency || 'usd').toUpperCase() }).format(cents / 100);

/** Used by the thank-you page; also confirms the donation if the webhook hasn't yet. */
export const GET = handle(async (request: Request) => {
  const sessionId = new URL(request.url).searchParams.get('session_id');
  if (!sessionId || !sessionId.startsWith('cs_')) throw new HttpError(400, 'Missing or invalid session id.');

  let session: Stripe.Checkout.Session;
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'subscription', 'payment_intent'],
    });
  } catch {
    throw new HttpError(404, 'Session not found or has expired');
  }
  await markSessionPaid(session);

  const subscription = session.subscription as Stripe.Subscription | null;
  const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null;
  return ok({
    session: {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email ?? session.customer_email,
      mode: session.mode,
      metadata: session.metadata ?? {},
      created: session.created,
      formatted_amount: money(session.amount_total, session.currency),
      line_items: (session.line_items?.data ?? []).map(item => ({
        description: item.description,
        amount_total: item.amount_total,
        formatted_amount: money(item.amount_total, item.currency),
        quantity: item.quantity,
      })),
      subscription: subscription
        ? { id: subscription.id, status: subscription.status, current_period_end: subscription.items?.data[0]?.current_period_end ?? null }
        : null,
      payment_intent: paymentIntent ? { id: paymentIntent.id, status: paymentIntent.status } : null,
    },
  });
});
