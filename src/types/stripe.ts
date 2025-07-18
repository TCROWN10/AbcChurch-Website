import { Stripe } from 'stripe';

// Donation form data interface
export interface DonationFormData {
  amount: number;
  category: 'Tithes' | 'Offerings' | 'Building Fund' | 'Missions';
  type: 'oneoff' | 'recurring';
  frequency?: 'weekly' | 'monthly' | 'yearly';
  email?: string;
}

// API request/response interfaces
export interface CheckoutRequest {
  amount: number;
  category: string;
  type: 'payment' | 'subscription';
  frequency?: string;
  email?: string;
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export interface PortalRequest {
  customerId: string;
}

export interface PortalResponse {
  url: string;
}

// Subscription-specific request/response interfaces
export interface SubscriptionRequest {
  amount: number;
  category: string;
  frequency: string;
  email?: string;
  customerId?: string;
}

export interface SubscriptionResponse {
  subscriptionId: string;
  clientSecret?: string;
  customerId: string;
  status: string;
  nextPaymentDate?: string;
}

// Webhook event interface
export interface WebhookEvent {
  type: string;
  data: {
    object: any;
  };
}

// Donation transaction interface
export interface DonationTransaction {
  id: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  stripeSubscriptionId?: string;
  amount: number;
  currency: string;
  category: string;
  type: 'oneoff' | 'recurring';
  frequency?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  customerEmail?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

// Subscription record interface
export interface SubscriptionRecord {
  id: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  amount: number;
  currency: string;
  category: string;
  frequency: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
  customerEmail: string;
  createdAt: Date;
  updatedAt: Date;
  nextPaymentDate?: Date;
}

// Error handling types
export enum DonationErrorType {
  VALIDATION_ERROR = 'validation_error',
  PAYMENT_ERROR = 'payment_error',
  NETWORK_ERROR = 'network_error',
  SERVER_ERROR = 'server_error',
  STRIPE_ERROR = 'stripe_error'
}

export interface DonationError {
  type: DonationErrorType;
  message: string;
  details?: any;
}

// Stripe configuration types
export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
}

// Re-export commonly used Stripe types
export type StripeCheckoutSession = Stripe.Checkout.Session;
export type StripeSubscription = Stripe.Subscription;
export type StripeCustomer = Stripe.Customer;
export type StripePaymentIntent = Stripe.PaymentIntent;
export type StripeEvent = Stripe.Event;