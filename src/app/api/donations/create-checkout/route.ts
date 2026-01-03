import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe/stripe-client';

export async function POST(request: Request) {
  try {
    const { amount, type, currency = 'USD', isRecurring = false, email } = await request.json();
    const stripe = getStripeClient();

    // Create a new Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: `Donation - ${type}`,
          },
          unit_amount: amount, // Amount in cents
          ...(isRecurring && {
            recurring: {
              interval: 'month', // Default to monthly, can be customized based on your needs
            },
          }),
        },
        quantity: 1,
      }],
      mode: isRecurring ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/donate/cancel`,
      ...(email && { customer_email: email }),
      metadata: {
        type,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
