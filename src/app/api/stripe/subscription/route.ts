import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe-client';
import { 
  validateDonationForm, 
  dollarsToCents, 
  generateStripeMetadata,
  getStripeInterval 
} from '@/lib/stripe-helpers';
import { handleStripeError, createValidationError, logDonationError } from '@/lib/stripe-errors';
import { DonationFormData } from '@/types/stripe';

// Subscription-specific request interface
export interface SubscriptionRequest {
  amount: number;
  category: string;
  frequency: string;
  email?: string;
  customerId?: string; // Optional for existing customers
}

// Subscription-specific response interface
export interface SubscriptionResponse {
  subscriptionId: string;
  clientSecret?: string;
  customerId: string;
  status: string;
  nextPaymentDate?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: SubscriptionRequest = await request.json();
    
    // Convert to DonationFormData for validation
    const formData: DonationFormData = {
      amount: body.amount,
      category: body.category as 'Tithes' | 'Offerings' | 'Building Fund' | 'Missions',
      type: 'recurring',
      frequency: body.frequency as 'weekly' | 'monthly' | 'yearly',
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

    // Additional validation for subscription-specific requirements
    if (!formData.frequency) {
      const error = createValidationError('Frequency is required for recurring donations');
      logDonationError(error, { formData });
      
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!formData.email && !body.customerId) {
      const error = createValidationError('Email or customer ID is required for subscriptions');
      logDonationError(error, { formData });
      
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Get Stripe client
    const stripe = getStripeClient();
    
    // Generate metadata
    const metadata = generateStripeMetadata(formData);
    
    let customer;
    let customerId = body.customerId;

    // Create or retrieve customer
    if (!customerId && formData.email) {
      // Check if customer already exists
      const existingCustomers = await stripe.customers.list({
        email: formData.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        customerId = customer.id;
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: formData.email,
          metadata: {
            source: 'donation_form',
            category: formData.category,
          },
        });
        customerId = customer.id;
      }
    } else if (customerId) {
      // Retrieve existing customer
      customer = await stripe.customers.retrieve(customerId);
      if (customer.deleted) {
        const error = createValidationError('Customer account has been deleted');
        logDonationError(error, { customerId });
        
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
    }

    if (!customerId) {
      const error = createValidationError('Unable to create or retrieve customer');
      logDonationError(error, { formData });
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Create or retrieve price for the subscription
    const priceKey = `${formData.category.toLowerCase().replace(' ', '_')}_${formData.frequency}_${formData.amount}`;
    
    // Check if price already exists
    const existingPrices = await stripe.prices.list({
      lookup_keys: [priceKey],
      limit: 1,
    });

    let price;
    if (existingPrices.data.length > 0) {
      price = existingPrices.data[0];
    } else {
      // Create new price
      price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: dollarsToCents(formData.amount),
        recurring: {
          interval: getStripeInterval(formData.frequency),
        },
        product_data: {
          name: `${formData.category} Donation`,
          metadata: {
            category: formData.category,
            frequency: formData.frequency,
            description: `Recurring ${formData.frequency} donation to ${formData.category}`,
          },
        },
        lookup_key: priceKey,
        metadata: {
          category: formData.category,
          frequency: formData.frequency,
          amount: formData.amount.toString(),
        },
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: price.id,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        ...metadata,
        priceId: price.id,
        customerId: customerId,
      },
    });

    // Handle different subscription statuses
    let clientSecret: string | undefined;
    if (subscription.status === 'incomplete') {
      const invoice = subscription.latest_invoice as any;
      if (invoice?.payment_intent?.client_secret) {
        clientSecret = invoice.payment_intent.client_secret;
      }
    }

    // Calculate next payment date
    let nextPaymentDate: string | undefined;
    if ((subscription as any).current_period_end) {
      nextPaymentDate = new Date((subscription as any).current_period_end * 1000).toISOString();
    }

    // Prepare response
    const response: SubscriptionResponse = {
      subscriptionId: subscription.id,
      clientSecret,
      customerId: customerId,
      status: subscription.status,
      nextPaymentDate,
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

// Get subscription details
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('subscriptionId');
    const customerId = searchParams.get('customerId');

    if (!subscriptionId && !customerId) {
      return NextResponse.json(
        { error: 'Subscription ID or Customer ID is required' },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();

    if (subscriptionId) {
      // Get specific subscription
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['customer', 'items.data.price.product'],
      });

      return NextResponse.json({
        subscription: {
          id: subscription.id,
          status: subscription.status,
          customerId: typeof subscription.customer === 'string' 
            ? subscription.customer 
            : subscription.customer?.id,
          amount: subscription.items.data[0]?.price?.unit_amount || 0,
          currency: subscription.items.data[0]?.price?.currency || 'usd',
          interval: subscription.items.data[0]?.price?.recurring?.interval,
          nextPaymentDate: (subscription as any).current_period_end 
            ? new Date((subscription as any).current_period_end * 1000).toISOString()
            : null,
          metadata: subscription.metadata,
        },
      });
    } else if (customerId) {
      // Get all subscriptions for customer
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        expand: ['data.items.data.price.product'],
      });

      const formattedSubscriptions = subscriptions.data.map(sub => ({
        id: sub.id,
        status: sub.status,
        amount: sub.items.data[0]?.price?.unit_amount || 0,
        currency: sub.items.data[0]?.price?.currency || 'usd',
        interval: sub.items.data[0]?.price?.recurring?.interval,
        nextPaymentDate: (sub as any).current_period_end 
          ? new Date((sub as any).current_period_end * 1000).toISOString()
          : null,
        metadata: sub.metadata,
      }));

      return NextResponse.json({
        subscriptions: formattedSubscriptions,
      });
    }

  } catch (error) {
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      url: request.url,
    });

    return NextResponse.json(
      { error: donationError.message, details: donationError.details },
      { status: 500 }
    );
  }
}

// Update subscription
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscriptionId, priceId, metadata } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();

    const updateData: any = {};
    
    if (priceId) {
      updateData.items = [{ price: priceId }];
      updateData.proration_behavior = 'create_prorations';
    }
    
    if (metadata) {
      updateData.metadata = metadata;
    }

    const subscription = await stripe.subscriptions.update(subscriptionId, updateData);

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      nextPaymentDate: (subscription as any).current_period_end 
        ? new Date((subscription as any).current_period_end * 1000).toISOString()
        : null,
    });

  } catch (error) {
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

// Cancel subscription
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('subscriptionId');
    const cancelAtPeriodEnd = searchParams.get('cancelAtPeriodEnd') === 'true';

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();

    let subscription;
    if (cancelAtPeriodEnd) {
      // Cancel at period end
      subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    } else {
      // Cancel immediately
      subscription = await stripe.subscriptions.cancel(subscriptionId);
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      canceledAt: subscription.canceled_at 
        ? new Date(subscription.canceled_at * 1000).toISOString()
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });

  } catch (error) {
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      url: request.url,
    });

    return NextResponse.json(
      { error: donationError.message, details: donationError.details },
      { status: 500 }
    );
  }
}