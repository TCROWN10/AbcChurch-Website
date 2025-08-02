import Stripe from 'stripe';
import { DonationError, DonationErrorType } from '@/types/stripe';

/**
 * Converts Stripe errors to user-friendly donation errors
 * @param error Stripe error or generic error
 * @returns Formatted donation error
 */
export function handleStripeError(error: unknown): DonationError {
  // Handle Stripe-specific errors
  if (error instanceof Stripe.errors.StripeError) {
    return {
      type: DonationErrorType.STRIPE_ERROR,
      message: getStripeErrorMessage(error),
      details: {
        code: error.code,
        type: error.type,
        param: error.param,
        stripeMessage: error.message,
      },
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      type: DonationErrorType.SERVER_ERROR,
      message: 'An unexpected error occurred. Please try again.',
      details: {
        originalMessage: error.message,
      },
    };
  }

  // Handle unknown errors
  return {
    type: DonationErrorType.SERVER_ERROR,
    message: 'An unexpected error occurred. Please try again.',
    details: { error },
  };
}

/**
 * Converts Stripe error codes to user-friendly messages
 * @param error Stripe error
 * @returns User-friendly error message
 */
function getStripeErrorMessage(error: Stripe.errors.StripeError): string {
  switch (error.code) {
    case 'card_declined':
      return 'Your card was declined. Please try a different payment method.';
    
    case 'expired_card':
      return 'Your card has expired. Please use a different payment method.';
    
    case 'incorrect_cvc':
      return 'Your card\'s security code is incorrect. Please check and try again.';
    
    case 'processing_error':
      return 'An error occurred while processing your payment. Please try again.';
    
    case 'incorrect_number':
      return 'Your card number is incorrect. Please check and try again.';
    
    case 'invalid_expiry_month':
    case 'invalid_expiry_year':
      return 'Your card\'s expiration date is invalid. Please check and try again.';
    
    case 'invalid_cvc':
      return 'Your card\'s security code is invalid. Please check and try again.';
    
    case 'insufficient_funds':
      return 'Your card has insufficient funds. Please try a different payment method.';
    
    case 'withdrawal_count_limit_exceeded':
      return 'You have exceeded the withdrawal limit for your card. Please try a different payment method.';
    
    case 'charge_exceeds_source_limit':
      return 'The donation amount exceeds your card\'s limit. Please try a smaller amount or different payment method.';
    
    case 'instant_payouts_unsupported':
      return 'Instant payouts are not supported for this payment method.';
    
    case 'payment_intent_authentication_failure':
      return 'Payment authentication failed. Please try again.';
    
    case 'payment_method_unactivated':
      return 'Your payment method is not activated. Please contact your bank.';
    
    case 'payment_method_unexpected_state':
      return 'Your payment method is in an unexpected state. Please try a different payment method.';
    
    case 'payouts_not_allowed':
      return 'Payouts are not allowed for this account.';
    
    case 'platform_api_key_expired':
      return 'The payment system is temporarily unavailable. Please try again later.';
    
    case 'rate_limit':
      return 'Too many requests. Please wait a moment and try again.';
    
    case 'api_key_expired':
    case 'authentication_required':
      return 'Payment system authentication error. Please contact support.';
    
    case 'amount_too_large':
      return 'The donation amount is too large. Please try a smaller amount.';
    
    case 'amount_too_small':
      return 'The donation amount is too small. Minimum donation is $0.50.';
    
    case 'balance_insufficient':
      return 'Insufficient balance for this transaction.';
    
    case 'currency_not_supported':
      return 'The selected currency is not supported.';
    
    default:
      // For unknown Stripe errors, return a generic message but log the specific error
      console.error('Unknown Stripe error:', error.code, error.message);
      return 'A payment error occurred. Please try again or contact support if the problem persists.';
  }
}

/**
 * Creates a validation error
 * @param message Error message
 * @param field Field that failed validation
 * @returns Donation error
 */
export function createValidationError(message: string, field?: string): DonationError {
  return {
    type: DonationErrorType.VALIDATION_ERROR,
    message,
    details: field ? { field } : undefined,
  };
}

/**
 * Creates a network error
 * @param message Error message
 * @returns Donation error
 */
export function createNetworkError(message: string = 'Network error occurred. Please check your connection and try again.'): DonationError {
  return {
    type: DonationErrorType.NETWORK_ERROR,
    message,
  };
}

/**
 * Creates a payment error
 * @param message Error message
 * @returns Donation error
 */
export function createPaymentError(message: string): DonationError {
  return {
    type: DonationErrorType.PAYMENT_ERROR,
    message,
  };
}

/**
 * Logs error for debugging and monitoring
 * @param error Donation error
 * @param context Additional context
 */
export function logDonationError(error: DonationError, context?: Record<string, any>): void {
  const logData = {
    type: error.type,
    message: error.message,
    details: error.details,
    context,
    timestamp: new Date().toISOString(),
  };

  // In production, you might want to send this to a logging service
  console.error('Donation Error:', logData);
}

/**
 * Checks if an error is retryable
 * @param error Donation error
 * @returns Whether the error is retryable
 */
export function isRetryableError(error: DonationError): boolean {
  const retryableTypes = [
    DonationErrorType.NETWORK_ERROR,
    DonationErrorType.SERVER_ERROR,
  ];

  if (retryableTypes.includes(error.type)) {
    return true;
  }

  // Some Stripe errors are retryable
  if (error.type === DonationErrorType.STRIPE_ERROR && error.details?.code) {
    const retryableStripeCodes = [
      'processing_error',
      'rate_limit',
      'api_connection_error',
      'api_error',
    ];
    return retryableStripeCodes.includes(error.details.code);
  }

  return false;
}

/**
 * Implements exponential backoff for retries
 * @param attempt Current attempt number (starting from 1)
 * @param baseDelay Base delay in milliseconds
 * @returns Delay in milliseconds
 */
export function getRetryDelay(attempt: number, baseDelay: number = 1000): number {
  return Math.min(baseDelay * Math.pow(2, attempt - 1), 30000); // Max 30 seconds
}

/**
 * Retry wrapper for async operations
 * @param operation Async operation to retry
 * @param maxRetries Maximum number of retries
 * @param baseDelay Base delay between retries
 * @returns Promise that resolves with the operation result
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: DonationError;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = handleStripeError(error);
      
      // Don't retry if it's the last attempt or error is not retryable
      if (attempt > maxRetries || !isRetryableError(lastError)) {
        throw lastError;
      }

      // Wait before retrying
      const delay = getRetryDelay(attempt, baseDelay);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      logDonationError(lastError, { attempt, nextRetryIn: delay });
    }
  }

  throw lastError!;
}