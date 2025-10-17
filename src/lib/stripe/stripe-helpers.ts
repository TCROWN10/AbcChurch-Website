import { DonationFormData } from '@/types/stripe';

// Stripe minimum amount in cents (50 cents = $0.50)
export const STRIPE_MINIMUM_AMOUNT = 50;

// Maximum reasonable donation amount in cents ($10,000)
export const STRIPE_MAXIMUM_AMOUNT = 1000000;

/**
 * Validates donation amount according to Stripe requirements
 * @param amount Amount in dollars
 * @returns Validation result with error message if invalid
 */
export function validateDonationAmount(amount: number): { isValid: boolean; error?: string } {
  // Check if amount is a valid number
  if (isNaN(amount) || !isFinite(amount)) {
    return { isValid: false, error: 'Please enter a valid donation amount' };
  }

  // Check minimum amount (Stripe requirement: $0.50)
  if (amount < 0.5) {
    return { isValid: false, error: 'Minimum donation amount is $0.50' };
  }

  // Check maximum amount (reasonable limit)
  if (amount > 10000) {
    return { isValid: false, error: 'Maximum donation amount is $10,000' };
  }

  // Check for reasonable decimal places (max 2)
  if (amount * 100 !== Math.floor(amount * 100)) {
    return { isValid: false, error: 'Please enter amount with maximum 2 decimal places' };
  }

  return { isValid: true };
}

/**
 * Converts dollar amount to cents for Stripe API
 * @param dollarAmount Amount in dollars
 * @returns Amount in cents
 */
export function dollarsToCents(dollarAmount: number): number {
  return Math.round(dollarAmount * 100);
}

/**
 * Converts cents to dollar amount for display
 * @param centsAmount Amount in cents
 * @returns Amount in dollars
 */
export function centsToDollars(centsAmount: number): number {
  return centsAmount / 100;
}

/**
 * Formats amount for display with currency symbol
 * @param amount Amount in dollars
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Validates donation form data
 * @param formData Donation form data
 * @returns Validation result with errors if any
 */
export function validateDonationForm(formData: DonationFormData): { 
  isValid: boolean; 
  errors: Record<string, string> 
} {
  const errors: Record<string, string> = {};

  // Validate amount
  const amountValidation = validateDonationAmount(formData.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error!;
  }

  // Validate category
  const validCategories = ['Tithes', 'Offerings', 'Building Fund', 'Missions'];
  if (!validCategories.includes(formData.category)) {
    errors.category = 'Please select a valid donation category';
  }

  // Validate type
  if (!['oneoff', 'recurring'].includes(formData.type)) {
    errors.type = 'Please select a valid donation type';
  }

  // Validate frequency for recurring donations
  if (formData.type === 'recurring') {
    if (!formData.frequency) {
      errors.frequency = 'Please select a frequency for recurring donations';
    } else if (!['weekly', 'monthly', 'yearly'].includes(formData.frequency)) {
      errors.frequency = 'Please select a valid frequency';
    }
  }

  // Validate email if provided
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Gets Stripe interval from frequency string
 * @param frequency Donation frequency
 * @returns Stripe interval
 */
export function getStripeInterval(frequency: string): 'week' | 'month' | 'year' {
  switch (frequency) {
    case 'weekly':
      return 'week';
    case 'monthly':
      return 'month';
    case 'yearly':
      return 'year';
    default:
      throw new Error(`Invalid frequency: ${frequency}`);
  }
}

/**
 * Generates metadata for Stripe sessions/subscriptions
 * @param formData Donation form data
 * @returns Metadata object
 */
export function generateStripeMetadata(formData: DonationFormData): Record<string, string> {
  return {
    category: formData.category,
    type: formData.type,
    ...(formData.frequency && { frequency: formData.frequency }),
    ...(formData.email && { email: formData.email }),
    source: 'church-website',
    timestamp: new Date().toISOString(),
  };
}