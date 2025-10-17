import Stripe from 'stripe';
import { getStripeSecretKey } from './stripe-config';

// Initialize Stripe client with configuration
let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!stripeClient) {
    const secretKey = getStripeSecretKey();
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2025-06-30.basil',
      typescript: true,
    });
  }
  
  return stripeClient;
}

// Client-side Stripe instance (for frontend)
export function getStripePublishableClient() {
  if (typeof window === 'undefined') {
    throw new Error('getStripePublishableClient can only be called on the client side');
  }
  
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is required');
  }
  
  return publishableKey;
}

export { stripeClient };