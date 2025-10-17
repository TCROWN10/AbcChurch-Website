import Stripe from 'stripe';
import { DonationTransaction, SubscriptionRecord } from '@/types/stripe';
import { centsToDollars } from '@/lib/stripe/stripe-helpers';
import { logDonationError, handleStripeError } from '@/lib/stripe/stripe-errors';
import { 
  logDonationTransaction, 
  updateTransactionStatus, 
  logSubscriptionRecord, 
  updateSubscriptionRecord,
  logWebhookEventData 
} from '@/lib/database/transaction-storage';

/**
 * Logs webhook events for debugging and monitoring
 */
export async function logWebhookEvent(event: Stripe.Event, message?: string): Promise<void> {
    const logData = {
        eventId: event.id,
        eventType: event.type,
        created: new Date(event.created * 1000).toISOString(),
        livemode: event.livemode,
        message,
        objectId: (event.data.object as any).id || 'unknown',
        timestamp: new Date().toISOString(),
    };

    console.log('Webhook Event:', logData);

    // Persist webhook event data
    await logWebhookEventData({
        eventId: event.id,
        eventType: event.type,
        processed: true,
        data: event.data.object,
    });
}

/**
 * Handles successful payment intent events (one-time donations)
 */
export async function handlePaymentSucceeded(event: Stripe.Event): Promise<void> {
    try {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        console.log('Payment succeeded:', {
            paymentIntentId: paymentIntent.id,
            amount: centsToDollars(paymentIntent.amount),
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            metadata: paymentIntent.metadata,
        });

        const { category, email } = paymentIntent.metadata || {};

        const transaction: Omit<DonationTransaction, 'id'> = {
            stripeSessionId: '', // Will be updated when we have session info
            stripePaymentIntentId: paymentIntent.id,
            amount: centsToDollars(paymentIntent.amount),
            currency: paymentIntent.currency,
            category: category || 'Offerings',
            type: 'oneoff',
            status: 'completed',
            customerEmail: email,
            createdAt: new Date(),
            updatedAt: new Date(),
            metadata: paymentIntent.metadata,
        };

        // Persist the transaction
        const savedTransaction = await logDonationTransaction(transaction);
        console.log('Transaction saved:', savedTransaction.id);

        if (email) {
            console.log('Should send confirmation email to:', email);
        }

        await logWebhookEvent(event, 'Payment succeeded and processed');

    } catch (error) {
        const donationError = handleStripeError(error);
        logDonationError(donationError, {
            eventType: event.type,
            eventId: event.id,
            paymentIntentId: (event.data.object as any).id
        });
        throw error;
    }
}

/**
 * Handles failed payment intent events (one-time donations)
 */
export async function handlePaymentFailed(event: Stripe.Event): Promise<void> {
    try {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        console.log('Payment failed:', {
            paymentIntentId: paymentIntent.id,
            amount: centsToDollars(paymentIntent.amount),
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            lastPaymentError: paymentIntent.last_payment_error,
            metadata: paymentIntent.metadata,
        });

        const { category, email } = paymentIntent.metadata || {};

        const transaction: Omit<DonationTransaction, 'id'> = {
            stripeSessionId: '', // Will be updated when we have session info
            stripePaymentIntentId: paymentIntent.id,
            amount: centsToDollars(paymentIntent.amount),
            currency: paymentIntent.currency,
            category: category || 'Offerings',
            type: 'oneoff',
            status: 'failed',
            customerEmail: email,
            createdAt: new Date(),
            updatedAt: new Date(),
            metadata: {
                ...paymentIntent.metadata,
                failureReason: paymentIntent.last_payment_error?.message,
                failureCode: paymentIntent.last_payment_error?.code,
            },
        };

        // Persist the failed transaction
        const savedTransaction = await logDonationTransaction(transaction);
        console.log('Failed transaction saved:', savedTransaction.id);

        if (email) {
            console.log('Should send failure notification to:', email);
        }

        await logWebhookEvent(event, 'Payment failed and logged');

    } catch (error) {
        const donationError = handleStripeError(error);
        logDonationError(donationError, {
            eventType: event.type,
            eventId: event.id,
            paymentIntentId: (event.data.object as any).id
        });
        throw error;
    }
}

/**
 * Handles subscription creation events (recurring donations)
 */
export async function handleSubscriptionCreated(event: Stripe.Event): Promise<void> {
    try {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('Subscription created:', {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            status: subscription.status,
            currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            metadata: subscription.metadata,
        });

        const { category, frequency, email } = subscription.metadata || {};
        const amount = subscription.items.data[0]?.price.unit_amount || 0;

        const subscriptionRecord: Omit<SubscriptionRecord, 'id'> = {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            amount: centsToDollars(amount),
            currency: subscription.currency || 'usd',
            category: category || 'Offerings',
            frequency: frequency || 'monthly',
            status: subscription.status as 'active' | 'cancelled' | 'past_due' | 'unpaid',
            customerEmail: email || '',
            createdAt: new Date(),
            updatedAt: new Date(),
            nextPaymentDate: new Date((subscription as any).current_period_end * 1000),
        };

        // Persist the subscription record
        const savedSubscription = await logSubscriptionRecord(subscriptionRecord);
        console.log('Subscription record saved:', savedSubscription.id);

        if (email) {
            console.log('Should send subscription welcome email to:', email);
        }

        await logWebhookEvent(event, 'Subscription created and processed');

    } catch (error) {
        const donationError = handleStripeError(error);
        logDonationError(donationError, {
            eventType: event.type,
            eventId: event.id,
            subscriptionId: (event.data.object as any).id
        });
        throw error;
    }
}

/**
 * Handles subscription update events (recurring donations)
 */
export async function handleSubscriptionUpdated(event: Stripe.Event): Promise<void> {
    try {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('Subscription updated:', {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            status: subscription.status,
            currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
            currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            metadata: subscription.metadata,
        });

        const { email } = subscription.metadata || {};
        const amount = subscription.items.data[0]?.price.unit_amount || 0;

        const subscriptionUpdate: Partial<SubscriptionRecord> = {
            amount: centsToDollars(amount),
            status: subscription.status as 'active' | 'cancelled' | 'past_due' | 'unpaid',
            updatedAt: new Date(),
            nextPaymentDate: new Date((subscription as any).current_period_end * 1000),
        };

        // Persist the subscription update
        const updatedSubscription = await updateSubscriptionRecord(subscription.id, subscriptionUpdate);
        console.log('Subscription updated:', updatedSubscription?.id || 'not found');

        if (email && (subscription.status === 'past_due' || subscription.status === 'unpaid')) {
            console.log('Should send payment issue notification to:', email);
        }

        await logWebhookEvent(event, 'Subscription updated and processed');

    } catch (error) {
        const donationError = handleStripeError(error);
        logDonationError(donationError, {
            eventType: event.type,
            eventId: event.id,
            subscriptionId: (event.data.object as any).id
        });
        throw error;
    }
}

/**
 * Handles subscription deletion/cancellation events (recurring donations)
 */
export async function handleSubscriptionDeleted(event: Stripe.Event): Promise<void> {
    try {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('Subscription deleted:', {
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            status: subscription.status,
            canceledAt: (subscription as any).canceled_at ? new Date((subscription as any).canceled_at * 1000) : null,
            metadata: subscription.metadata,
        });

        const { email } = subscription.metadata || {};

        const subscriptionUpdate: Partial<SubscriptionRecord> = {
            status: 'cancelled',
            updatedAt: new Date(),
        };

        // Persist the subscription cancellation
        const updatedSubscription = await updateSubscriptionRecord(subscription.id, subscriptionUpdate);
        console.log('Subscription cancelled:', updatedSubscription?.id || 'not found');

        if (email) {
            console.log('Should send cancellation confirmation email to:', email);
        }

        await logWebhookEvent(event, 'Subscription cancelled and processed');

    } catch (error) {
        const donationError = handleStripeError(error);
        logDonationError(donationError, {
            eventType: event.type,
            eventId: event.id,
            subscriptionId: (event.data.object as any).id
        });
        throw error;
    }
}

/**
 * Handles successful invoice payment events (recurring donation payments)
 */
export async function handleInvoicePaymentSucceeded(event: Stripe.Event): Promise<void> {
    try {
        const invoice = event.data.object as Stripe.Invoice;

        console.log('Invoice payment succeeded:', {
            invoiceId: invoice.id,
            subscriptionId: (invoice as any).subscription,
            customerId: invoice.customer,
            amount: centsToDollars(invoice.amount_paid),
            currency: invoice.currency,
            status: invoice.status,
        });

        if (invoice.customer_email) {
            console.log('Should send recurring payment receipt to:', invoice.customer_email);
        }

        await logWebhookEvent(event, 'Invoice payment succeeded and processed');

    } catch (error) {
        const donationError = handleStripeError(error);
        logDonationError(donationError, {
            eventType: event.type,
            eventId: event.id,
            invoiceId: (event.data.object as any).id
        });
        throw error;
    }
}

/**
 * Handles failed invoice payment events (recurring donation payment failures)
 */
export async function handleInvoicePaymentFailed(event: Stripe.Event): Promise<void> {
    try {
        const invoice = event.data.object as Stripe.Invoice;

        console.log('Invoice payment failed:', {
            invoiceId: invoice.id,
            subscriptionId: (invoice as any).subscription,
            customerId: invoice.customer,
            amount: centsToDollars(invoice.amount_due),
            currency: invoice.currency,
            status: invoice.status,
            attemptCount: invoice.attempt_count,
        });

        if (invoice.customer_email) {
            console.log('Should send payment failure notification to:', invoice.customer_email);
        }

        await logWebhookEvent(event, 'Invoice payment failed and logged');

    } catch (error) {
        const donationError = handleStripeError(error);
        logDonationError(donationError, {
            eventType: event.type,
            eventId: event.id,
            invoiceId: (event.data.object as any).id
        });
        throw error;
    }
}