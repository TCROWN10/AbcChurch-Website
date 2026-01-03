import { DonationError, DonationErrorType } from '@/types/stripe';

/**
 * Handle Stripe errors and convert to DonationError format
 */
export function handleStripeError(error: unknown): DonationError {
  if (error instanceof Error) {
    // Check if it's a Stripe error
    if ('type' in error && 'code' in error) {
      return {
        type: DonationErrorType.STRIPE_ERROR,
        message: error.message,
        details: error,
      };
    }
    
    return {
      type: DonationErrorType.SERVER_ERROR,
      message: error.message,
      details: error,
    };
  }
  
  return {
    type: DonationErrorType.SERVER_ERROR,
    message: 'Unknown error occurred',
    details: error,
  };
}

/**
 * Log donation errors
 */
export function logDonationError(error: DonationError, context?: Record<string, any>): void {
  console.error('Donation Error:', {
    type: error.type,
    message: error.message,
    details: error.details,
    context,
  });
}

