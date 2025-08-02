import { NextRequest, NextResponse } from 'next/server';
import { getDonationAnalytics } from '@/lib/services/donation-reporting';
import { handleStripeError, logDonationError } from '@/lib/stripe/stripe-errors';

/**
 * GET /api/donations/analytics - Get donation analytics for a specific time period
 * 
 * Query parameters:
 * - startDate: Start date for analytics (ISO string, required)
 * - endDate: End date for analytics (ISO string, required)
 * - compareWithPrevious: Whether to compare with previous period (true | false)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const compareWithPrevious = searchParams.get('compareWithPrevious') === 'true';

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    let startDate: Date;
    let endDate: Date;

    try {
      startDate = new Date(startDateParam);
      endDate = new Date(endDateParam);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid date format. Use ISO date strings.' },
        { status: 400 }
      );
    }

    if (startDate >= endDate) {
      return NextResponse.json(
        { error: 'startDate must be before endDate' },
        { status: 400 }
      );
    }

    // Get analytics
    const analytics = await getDonationAnalytics(startDate, endDate, compareWithPrevious);
    return NextResponse.json(analytics);

  } catch (error) {
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      url: request.url,
      method: request.method,
    });

    return NextResponse.json(
      { error: 'Failed to generate analytics', details: donationError.message },
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