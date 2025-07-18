import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe-client';
import { 
  validateDonationForm, 
  dollarsToCents, 
  generateStripeMetadata,
  getStripeInterval 
} from '@/lib/stripe-helpers';
import { handleStripeError, createValidationError, logDonationError } from '@/lib/stripe-errors';
import { CheckoutRequest, CheckoutResponse, DonationFormData } from '@/types/stripe';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: CheckoutRequest = await request.json();
    
    // Convert CheckoutRequest to DonationFormData for validation
    const formData: DonationFormData = {
      amount: body.amount,
      category: body.category as 'Tithes' | 'Offerings' | 'Building Fund' | 'Missions',
      type: body.type === 'payment' ? 'oneoff' : 'recurring',
      frequency: body.frequency as 'weekly' | 'monthly' | 'yearly' | undefined,
      email: body.email,
    };

    // Validate form data
    const validation = validateDonationForm(formData);
    if (!validation.isValid) {
      const errorMessage = Object.values(validation.errors).join(', ');
      const error = createValidationError(errorMessage);
      logDonationError(error, { formData, validationErrors: validation.errors });
      
      return NextResponse.json(
        { error: error.message, details: validation.errors },
        { status: 400 }
      );
    }

    // Get Stripe client
    const stripe = getStripeClient();
    
    // Generate metadata
    const metadata = generateStripeMetadata(formData);
    
    // Get the origin for success/cancel URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    
    // Create checkout session based on type
    let session;
    
    if (body.type === 'payment') {
      // One-time payment session
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${formData.category} Donation`,
                description: `One-time donation to ${formData.category}`,
              },
              unit_amount: dollarsToCents(formData.amount),
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/donate/cancel?session_id={CHECKOUT_SESSION_ID}`,
        metadata,
        ...(formData.email && { customer_email: formData.email }),
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        payment_intent_data: {
          metadata,
        },
      });
    } else {
      // Subscription session
      if (!formData.frequency) {
        const error = createValidationError('Frequency is required for recurring donations');
        logDonationError(error, { formData });
        
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${formData.category} Donation`,
                description: `Recurring donation to ${formData.category}`,
              },
              unit_amount: dollarsToCents(formData.amount),
              recurring: {
                interval: getStripeInterval(formData.frequency),
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/donate/cancel?session_id={CHECKOUT_SESSION_ID}`,
        metadata,
        ...(formData.email && { customer_email: formData.email }),
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        subscription_data: {
          metadata,
        },
      });
    }

    // Return session details
    const response: CheckoutResponse = {
      sessionId: session.id,
      url: session.url!,
    };

    return NextResponse.json(response);

  } catch (error) {
    // Handle and log error
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      requestBody: await request.json().catch(() => null),
      url: request.url,
    });

    return NextResponse.json(
      { error: donationError.message, details: donationError.details },
      { status: 500 }
    );
  }
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