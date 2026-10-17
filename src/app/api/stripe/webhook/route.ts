import type Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { stripeConfig } from '@/lib/server/config';
import { getStripe, markSessionFailed, markSessionPaid, recordRecurringRenewal } from '@/lib/server/donations';

export async function POST(request: Request) {
  if (!stripeConfig.webhookSecret) {
    return NextResponse.json({ message: 'STRIPE_WEBHOOK_SECRET is not configured.' }, { status: 503 });
  }
  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ message: 'Missing signature.' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, stripeConfig.webhookSecret);
  } catch (error) {
    return NextResponse.json({ message: `Invalid signature: ${(error as Error).message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await markSessionPaid(event.data.object);
        break;
      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed':
        await markSessionFailed(event.data.object);
        break;
      case 'invoice.paid':
        await recordRecurringRenewal(event.data.object);
        break;
    }
  } catch (error) {
    console.error('[stripe webhook] failed to process', event.type, error);
    return NextResponse.json({ message: 'Processing failed.' }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
