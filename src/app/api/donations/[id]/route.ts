import { NextRequest, NextResponse } from 'next/server';
import { getDonationTransaction } from '@/lib/donation-reporting';
import { handleStripeError, logDonationError } from '@/lib/stripe-errors';

/**
 * GET /api/donations/[id] - Retrieve a specific donation transaction
 * 
 * The [id] parameter can be:
 * - Transaction ID
 * - Stripe Payment Intent ID (prefixed with 'pi_')
 * - Stripe Session ID (prefixed with 'cs_')
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Determine the type of ID and build identifier object
    let identifier: {
      id?: string;
      stripePaymentIntentId?: string;
      stripeSessionId?: string;
    } = {};

    if (id.startsWith('pi_')) {
      identifier.stripePaymentIntentId = id;
    } else if (id.startsWith('cs_')) {
      identifier.stripeSessionId = id;
    } else {
      identifier.id = id;
    }

    // Get the transaction
    const transaction = await getDonationTransaction(identifier);

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);

  } catch (error) {
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      url: request.url,
      method: request.method,
      transactionId: 'unknown',
    });

    return NextResponse.json(
      { error: 'Failed to retrieve transaction', details: donationError.message },
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