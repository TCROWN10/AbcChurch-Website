import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe-client';
import { handleStripeError, logDonationError } from '@/lib/stripe-errors';
import { centsToDollars, formatCurrency } from '@/lib/stripe-helpers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();
    
    // Retrieve the checkout session with expanded data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'subscription', 'payment_intent']
    });

    // Extract relevant information
    const sessionData = {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      amount_subtotal: session.amount_subtotal,
      currency: session.currency,
      customer_email: session.customer_email,
      mode: session.mode,
      metadata: session.metadata,
      created: session.created,
      // Format amounts for display
      formatted_amount: session.amount_total ? formatCurrency(centsToDollars(session.amount_total)) : null,
      // Extract line item details
      line_items: session.line_items?.data.map(item => ({
        description: item.description,
        amount_total: item.amount_total,
        formatted_amount: item.amount_total ? formatCurrency(centsToDollars(item.amount_total)) : null,
        quantity: item.quantity
      })),
      // Subscription details if applicable
      subscription: session.subscription ? {
        id: typeof session.subscription === 'string' ? session.subscription : session.subscription.id,
        status: typeof session.subscription === 'object' ? session.subscription.status : null,
        current_period_end: typeof session.subscription === 'object' && 'current_period_end' in session.subscription ? session.subscription.current_period_end : null
      } : null,
      // Payment intent details if applicable
      payment_intent: session.payment_intent ? {
        id: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id,
        status: typeof session.payment_intent === 'object' ? session.payment_intent.status : null
      } : null
    };

    return NextResponse.json(sessionData);

  } catch (error) {
    // Handle and log error
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      sessionId: new URL(request.url).searchParams.get('session_id'),
      url: request.url,
    });

    // Return appropriate error response
    if (donationError.message.includes('No such checkout session')) {
      return NextResponse.json(
        { error: 'Session not found or has expired' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to retrieve session information' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}