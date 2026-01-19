import type { DonationError } from '@/types/stripe';
import { DonationErrorType } from '@/types/stripe';

/**
 * Handles Stripe errors and converts them to DonationError format
 */
export function handleStripeError(error: unknown): DonationError {
  // Check if it's already a DonationError
  if (error && typeof error === 'object' && 'type' in error && 'message' in error) {
    return error as DonationError;
  }

  // Check if it's a Stripe error
  if (error && typeof error === 'object' && 'type' in error) {
    const stripeError = error as any;
    return {
      type: DonationErrorType.STRIPE_ERROR,
      message: stripeError.message || stripeError.raw?.message || 'Stripe error occurred',
    };
  }

  // Check if it's an Error object
  if (error instanceof Error) {
    return {
      type: DonationErrorType.SERVER_ERROR,
      message: error.message || 'An error occurred',
    };
  }

  // Default error
  return {
    type: DonationErrorType.SERVER_ERROR,
    message: typeof error === 'string' ? error : 'An unknown error occurred',
  };
}

/**
 * Logs donation errors for debugging and monitoring
 */
export function logDonationError(error: DonationError, context?: Record<string, any>): void {
  const logData = {
    error: {
      type: error.type,
      message: error.message,
    },
    context,
    timestamp: new Date().toISOString(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Donation Error:', logData);
  }

  // In production, you might want to send this to a logging service
  // For now, we'll just log to console
  console.error('Donation Error:', JSON.stringify(logData, null, 2));
}

