import { NextRequest, NextResponse } from 'next/server';
import { 
  getDonationTransactions, 
  getDonationTransaction,
  getDonationSummary,
  getDonationAnalytics,
  DonationFilters,
  DonationSortOptions,
  PaginationOptions 
} from '@/lib/services/donation-reporting';
import { handleStripeError, logDonationError } from '@/lib/stripe/stripe-errors';

/**
 * GET /api/donations - Retrieve donation transactions with filtering, sorting, and pagination
 * 
 * Query parameters:
 * - category: Filter by donation category
 * - type: Filter by donation type (oneoff | recurring)
 * - status: Filter by transaction status
 * - startDate: Filter by start date (ISO string)
 * - endDate: Filter by end date (ISO string)
 * - customerEmail: Filter by customer email
 * - sortField: Sort field (createdAt | amount | category | status)
 * - sortDirection: Sort direction (asc | desc)
 * - page: Page number for pagination
 * - limit: Items per page
 * - summary: Return summary statistics (true | false)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if summary is requested
    const summaryRequested = searchParams.get('summary') === 'true';
    
    if (summaryRequested) {
      // Return donation summary
      const filters: DonationFilters = {};
      
      if (searchParams.get('category')) filters.category = searchParams.get('category')!;
      if (searchParams.get('type')) filters.type = searchParams.get('type') as 'oneoff' | 'recurring';
      if (searchParams.get('status')) filters.status = searchParams.get('status') as any;
      if (searchParams.get('customerEmail')) filters.customerEmail = searchParams.get('customerEmail')!;
      if (searchParams.get('startDate')) filters.startDate = new Date(searchParams.get('startDate')!);
      if (searchParams.get('endDate')) filters.endDate = new Date(searchParams.get('endDate')!);

      const summary = await getDonationSummary(filters);
      return NextResponse.json(summary);
    }

    // Build filters
    const filters: DonationFilters = {};
    if (searchParams.get('category')) filters.category = searchParams.get('category')!;
    if (searchParams.get('type')) filters.type = searchParams.get('type') as 'oneoff' | 'recurring';
    if (searchParams.get('status')) filters.status = searchParams.get('status') as any;
    if (searchParams.get('customerEmail')) filters.customerEmail = searchParams.get('customerEmail')!;
    if (searchParams.get('startDate')) filters.startDate = new Date(searchParams.get('startDate')!);
    if (searchParams.get('endDate')) filters.endDate = new Date(searchParams.get('endDate')!);

    // Build sort options
    let sort: DonationSortOptions | undefined;
    const sortField = searchParams.get('sortField');
    const sortDirection = searchParams.get('sortDirection');
    
    if (sortField && ['createdAt', 'amount', 'category', 'status'].includes(sortField)) {
      sort = {
        field: sortField as any,
        direction: (sortDirection === 'desc' ? 'desc' : 'asc'),
      };
    }

    // Build pagination options
    let pagination: PaginationOptions | undefined;
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    
    if (page && limit) {
      pagination = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
      };
    }

    // Get transactions
    const result = await getDonationTransactions(filters, sort, pagination);
    return NextResponse.json(result);

  } catch (error) {
    const donationError = handleStripeError(error);
    logDonationError(donationError, { 
      url: request.url,
      method: request.method,
    });

    return NextResponse.json(
      { error: 'Failed to retrieve donations', details: donationError.message },
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