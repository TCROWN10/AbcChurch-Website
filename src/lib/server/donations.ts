import 'server-only';
import Stripe from 'stripe';
import type { Donation } from '@/lib/content-types';
import { HttpError } from './auth';
import { stripeConfig } from './config';
import { store } from './store';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeConfig.secretKey) {
    throw new HttpError(503, 'Online giving is not set up yet. Please try again later or give in person.');
  }
  stripeClient ??= new Stripe(stripeConfig.secretKey);
  return stripeClient;
}

const INTERVAL: Record<NonNullable<Donation['frequency']>, Stripe.Price.Recurring.Interval> = {
  weekly: 'week',
  monthly: 'month',
  yearly: 'year',
};

export async function createDonationCheckout(input: {
  amount: number;
  category: string;
  isRecurring: boolean;
  frequency?: Donation['frequency'];
  donorEmail: string;
  donorName?: string;
  userId?: string;
  origin: string;
}) {
  const stripe = getStripe();
  const donation = await store.insert('donations', {
    amount: input.amount,
    currency: 'usd',
    category: input.category,
    isRecurring: input.isRecurring,
    frequency: input.isRecurring ? input.frequency : undefined,
    donorEmail: input.donorEmail,
    donorName: input.donorName,
    userId: input.userId,
    status: 'pending',
  });

  const metadata = {
    donationId: donation.id,
    category: input.category,
    ...(input.isRecurring && input.frequency ? { frequency: input.frequency } : {}),
  };
  const cancelParams = new URLSearchParams({
    amount: input.amount.toFixed(2),
    category: input.category,
    email: input.donorEmail,
    ...(input.isRecurring && input.frequency ? { frequency: input.frequency } : {}),
  });

  const session = await stripe.checkout.sessions.create({
    mode: input.isRecurring ? 'subscription' : 'payment',
    customer_email: input.donorEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(input.amount * 100),
          product_data: { name: `${input.category} — All Believers Christian Church` },
          ...(input.isRecurring && input.frequency
            ? { recurring: { interval: INTERVAL[input.frequency] } }
            : {}),
        },
      },
    ],
    metadata,
    ...(input.isRecurring
      ? { subscription_data: { metadata } }
      : { payment_intent_data: { metadata, receipt_email: input.donorEmail } }),
    success_url: `${input.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/donate/cancel?${cancelParams.toString()}`,
  });

  await store.update('donations', donation.id, { stripeSessionId: session.id });
  return session.url;
}

/** Idempotently marks the donation behind a Checkout session as paid. */
export async function markSessionPaid(session: Stripe.Checkout.Session) {
  const donationId = session.metadata?.donationId;
  if (!donationId || session.payment_status !== 'paid') return null;
  const donation = await store.get('donations', donationId);
  if (!donation || donation.status === 'completed') return donation;
  const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
  return store.update('donations', donationId, {
    status: 'completed',
    paidAt: new Date().toISOString(),
    donorName: donation.donorName ?? session.customer_details?.name ?? undefined,
    stripeSubscriptionId: subscriptionId ?? undefined,
  });
}

export async function markSessionFailed(session: Stripe.Checkout.Session) {
  const donationId = session.metadata?.donationId;
  if (!donationId) return;
  const donation = await store.get('donations', donationId);
  if (donation?.status === 'pending') await store.update('donations', donationId, { status: 'failed' });
}

/** Records each renewal of a recurring gift as its own donation. */
export async function recordRecurringRenewal(invoice: Stripe.Invoice) {
  if (invoice.billing_reason !== 'subscription_cycle') return;
  const subscriptionId =
    typeof invoice.parent?.subscription_details?.subscription === 'string'
      ? invoice.parent.subscription_details.subscription
      : invoice.parent?.subscription_details?.subscription?.id;
  if (!subscriptionId) return;
  const original = await store.findOne('donations', { stripeSubscriptionId: subscriptionId });
  if (!original) return;
  await store.insert('donations', {
    amount: invoice.amount_paid / 100,
    currency: invoice.currency,
    category: original.category,
    isRecurring: true,
    frequency: original.frequency,
    donorEmail: original.donorEmail,
    donorName: original.donorName,
    userId: original.userId,
    status: 'completed',
    stripeSubscriptionId: subscriptionId,
    paidAt: new Date().toISOString(),
  });
}
