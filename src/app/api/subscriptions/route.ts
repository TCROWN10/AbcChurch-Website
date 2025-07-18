import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionRecords, getSubscriptionRecord } from '@/lib/donation-reporting';
import { handleStripeError, logDonationError } from '@/lib/stripe-errors';

/**
 * GET /api/subscriptions - Retrieve subscription records with optional filtering
 * 
 * Query parameters:
 * - status: Filter by subscription status (active | cancelled | past_due | unpaid)
 * - category: Filter by donation category
 * - customerEmail: Filter by customer email
 * - subscriptionId: Get specific subscription by Stripe subscription ID
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if specific subscription is requested
    const subscriptionId = searchParams.get('subscriptionId');
    
    if (subscriptionId) {
      const subscription = await getSubscriptionRecord(subscriptionId);
      
      if (!subscription) {
        return NextResponse.json(
          { error: 'Subscription not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(subscription);
    }

    // Build filters for multiple subscriptions
    const filters: {
      status?: 'active' | 'cancelled' | 'past_due' | 'unpaid';
      category?: string;
      customerEmail?: string;
    } = {};

    if (searchParams.get('status')) {
      filters.status = searchParams.get('status') as any;
    }
    if (searchParams.get('category')) {
      filters.category = searchParams.get('category')!;
    }
    if (searchParams.get('customerEmail')) {
      filters.customerEmail = searchParams.get('customerEmail')!;
    }

    // Get subscriptions
    const subscriptions = await getSubscriptionRecords(filters);
    return NextResponse.json({
      data: subscriptions,
      total: subscriptions.length,
    });

  } catch (error) {
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      url: request.url,
      method: request.method,
    });

    return NextResponse.json(
      { error: 'Failed to retrieve subscriptions', details: donationError.message },
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