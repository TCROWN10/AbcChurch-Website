import { StripeConfig } from '@/types/stripe';

// Validate that all required environment variables are present
function validateStripeConfig(): StripeConfig {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!publishableKey) {
    throw new Error('STRIPE_PUBLISHABLE_KEY environment variable is required');
  }

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is required');
  }

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
  }

  return {
    publishableKey,
    secretKey,
    webhookSecret,
  };
}

// Export validated configuration
export const stripeConfig = validateStripeConfig();

// Export individual keys for convenience
export const {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  secretKey: STRIPE_SECRET_KEY,
  webhookSecret: STRIPE_WEBHOOK_SECRET,
} = stripeConfig;