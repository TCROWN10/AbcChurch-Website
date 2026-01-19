/**
 * Stripe helper utilities
 */

/**
 * Converts Stripe amount (in cents) to dollars
 * @param cents - Amount in cents
 * @returns Amount in dollars as a number
 */
export function centsToDollars(cents: number | null | undefined): number {
  if (cents == null || cents === 0) {
    return 0;
  }
  return Number((cents / 100).toFixed(2));
}

/**
 * Converts dollars to Stripe amount (in cents)
 * @param dollars - Amount in dollars
 * @returns Amount in cents as a number
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}


