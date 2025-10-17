import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe/stripe-client';
import { STRIPE_WEBHOOK_SECRET } from '@/lib/stripe/stripe-config';
import { handleStripeError, logDonationError, createValidationError } from '@/lib/stripe/stripe-errors';

// Webhook event handlers
import { 
  handlePaymentSucceeded,
  handlePaymentFailed,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleInvoicePaymentSucceeded,
  handleInvoicePaymentFailed,
  logWebhookEvent
} from '@/lib/services/webhook-handlers';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body as text for signature verification
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      const error = createValidationError('Missing Stripe signature header');
      logDonationError(error, { url: request.url });
      
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const stripe = getStripeClient();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      const error = handleStripeError(err);
      logDonationError(error, { 
        url: request.url,
        signaturePresent: !!signature,
        bodyLength: body.length
      });
      
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Log the webhook event for debugging
    await logWebhookEvent(event);

    // Handle different event types
    try {
      switch (event.type) {
        // Payment Intent events (one-time donations)
        case 'payment_intent.succeeded':
          await handlePaymentSucceeded(event);
          break;

        case 'payment_intent.payment_failed':
          await handlePaymentFailed(event);
          break;

        // Subscription events (recurring donations)
        case 'customer.subscription.created':
          await handleSubscriptionCreated(event);
          break;

        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event);
          break;

        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event);
          break;

        // Invoice events (for subscription payments)
        case 'invoice.payment_succeeded':
          await handleInvoicePaymentSucceeded(event);
          break;

        case 'invoice.payment_failed':
          await handleInvoicePaymentFailed(event);
          break;

        // Checkout session events
        case 'checkout.session.completed':
          await handleCheckoutSessionCompleted(event);
          break;

        case 'checkout.session.expired':
          await handleCheckoutSessionExpired(event);
          break;

        default:
          // Log unhandled events for monitoring
          console.log(`Unhandled event type: ${event.type}`);
          break;
      }

      // Return success response
      return NextResponse.json({ received: true });

    } catch (handlerError) {
      // Log handler errors but still return success to Stripe
      // to prevent webhook retries for application-level errors
      const error = handleStripeError(handlerError);
      logDonationError(error, { 
        eventType: event.type,
        eventId: event.id,
        url: request.url
      });

      // Return success to Stripe to prevent retries
      // The error is logged for investigation
      return NextResponse.json({ 
        received: true, 
        warning: 'Event received but handler failed' 
      });
    }

  } catch (error) {
    // Handle unexpected errors
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      url: request.url,
      method: request.method
    });

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout session completed events
 * This is called when a customer successfully completes a checkout session
 */
async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  
  console.log('Checkout session completed:', {
    sessionId: session.id,
    mode: session.mode,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_email,
    metadata: session.metadata
  });

  // For payment mode (one-time donations), the payment_intent.succeeded event
  // will handle the actual payment processing
  
  // For subscription mode (recurring donations), the customer.subscription.created
  // event will handle the subscription setup
  
  // Here we can log the successful checkout completion
  await logWebhookEvent(event, 'Checkout session completed successfully');
}

/**
 * Handle checkout session expired events
 * This is called when a checkout session expires without completion
 */
async function handleCheckoutSessionExpired(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  
  console.log('Checkout session expired:', {
    sessionId: session.id,
    mode: session.mode,
    customerEmail: session.customer_email,
    metadata: session.metadata
  });

  // Log the expired session for analytics
  await logWebhookEvent(event, 'Checkout session expired without completion');
}

// Handle unsupported methods
export async function GET() {
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