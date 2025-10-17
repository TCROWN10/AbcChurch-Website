import { StripeConfig } from '@/types/stripe';

// Helper function to get and validate environment variable at runtime
function getEnvVar(key: string, errorMessage: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(errorMessage);
  }
  return value;
}

// Export environment variables - these will throw at runtime if not set, not at build time
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || '';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Export validated getters that will throw if env vars are missing
export function getStripePublishableKey(): string {
  return getEnvVar('STRIPE_PUBLISHABLE_KEY', 'STRIPE_PUBLISHABLE_KEY environment variable is required');
}

export function getStripeSecretKey(): string {
  return getEnvVar('STRIPE_SECRET_KEY', 'STRIPE_SECRET_KEY environment variable is required');
}

export function getStripeWebhookSecret(): string {
  return getEnvVar('STRIPE_WEBHOOK_SECRET', 'STRIPE_WEBHOOK_SECRET environment variable is required');
}

// Export validated configuration
export function getStripeConfig(): StripeConfig {
  return {
    publishableKey: getStripePublishableKey(),
    secretKey: getStripeSecretKey(),
    webhookSecret: getStripeWebhookSecret(),
  };
}