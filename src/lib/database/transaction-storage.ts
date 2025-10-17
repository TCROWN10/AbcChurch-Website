import { DonationTransaction, SubscriptionRecord } from '@/types/stripe';

/**
 * Transaction storage interface for donation data persistence
 * This implementation uses JSON file storage for simplicity
 * In production, this would be replaced with a proper database
 */

// Storage file paths
const TRANSACTIONS_FILE = 'data/transactions.json';
const SUBSCRIPTIONS_FILE = 'data/subscriptions.json';
const WEBHOOK_EVENTS_FILE = 'data/webhook-events.json';

// Ensure data directory exists
import { promises as fs } from 'fs';
import path from 'path';

async function ensureDataDirectory(): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

/**
 * Read JSON file with error handling
 */
async function readJsonFile<T>(filePath: string): Promise<T[]> {
  try {
    await ensureDataDirectory();
    const fullPath = path.join(process.cwd(), filePath);
    const data = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is empty, return empty array
    return [];
  }
}

/**
 * Write JSON file with error handling
 */
async function writeJsonFile<T>(filePath: string, data: T[]): Promise<void> {
  try {
    await ensureDataDirectory();
    const fullPath = path.join(process.cwd(), filePath);
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    throw new Error(`Failed to write data to ${filePath}`);
  }
}

/**
 * Generate unique ID for records
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Log a donation transaction
 */
export async function logDonationTransaction(transaction: Omit<DonationTransaction, 'id'>): Promise<DonationTransaction> {
  try {
    const transactions = await readJsonFile<DonationTransaction>(TRANSACTIONS_FILE);
    
    const newTransaction: DonationTransaction = {
      id: generateId(),
      ...transaction,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    transactions.push(newTransaction);
    await writeJsonFile(TRANSACTIONS_FILE, transactions);

    console.log('Transaction logged:', {
      id: newTransaction.id,
      type: newTransaction.type,
      amount: newTransaction.amount,
      category: newTransaction.category,
      status: newTransaction.status,
    });

    return newTransaction;
  } catch (error) {
    console.error('Error logging donation transaction:', error);
    throw new Error('Failed to log donation transaction');
  }
}

/**
 * Update transaction status
 */
export async function updateTransactionStatus(
  identifier: { stripePaymentIntentId?: string; stripeSessionId?: string; id?: string },
  status: DonationTransaction['status'],
  metadata?: Record<string, any>
): Promise<DonationTransaction | null> {
  try {
    const transactions = await readJsonFile<DonationTransaction>(TRANSACTIONS_FILE);
    
    const transactionIndex = transactions.findIndex(t => 
      (identifier.id && t.id === identifier.id) ||
      (identifier.stripePaymentIntentId && t.stripePaymentIntentId === identifier.stripePaymentIntentId) ||
      (identifier.stripeSessionId && t.stripeSessionId === identifier.stripeSessionId)
    );

    if (transactionIndex === -1) {
      console.warn('Transaction not found for update:', identifier);
      return null;
    }

    transactions[transactionIndex] = {
      ...transactions[transactionIndex],
      status,
      updatedAt: new Date(),
      ...(metadata && { metadata: { ...transactions[transactionIndex].metadata, ...metadata } }),
    };

    await writeJsonFile(TRANSACTIONS_FILE, transactions);

    console.log('Transaction status updated:', {
      id: transactions[transactionIndex].id,
      status,
      identifier,
    });

    return transactions[transactionIndex];
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw new Error('Failed to update transaction status');
  }
}

/**
 * Log a subscription record
 */
export async function logSubscriptionRecord(subscription: Omit<SubscriptionRecord, 'id'>): Promise<SubscriptionRecord> {
  try {
    const subscriptions = await readJsonFile<SubscriptionRecord>(SUBSCRIPTIONS_FILE);
    
    const newSubscription: SubscriptionRecord = {
      id: generateId(),
      ...subscription,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    subscriptions.push(newSubscription);
    await writeJsonFile(SUBSCRIPTIONS_FILE, subscriptions);

    console.log('Subscription logged:', {
      id: newSubscription.id,
      stripeSubscriptionId: newSubscription.stripeSubscriptionId,
      amount: newSubscription.amount,
      frequency: newSubscription.frequency,
      status: newSubscription.status,
    });

    return newSubscription;
  } catch (error) {
    console.error('Error logging subscription record:', error);
    throw new Error('Failed to log subscription record');
  }
}

/**
 * Update subscription record
 */
export async function updateSubscriptionRecord(
  stripeSubscriptionId: string,
  updates: Partial<Omit<SubscriptionRecord, 'id' | 'stripeSubscriptionId' | 'createdAt'>>
): Promise<SubscriptionRecord | null> {
  try {
    const subscriptions = await readJsonFile<SubscriptionRecord>(SUBSCRIPTIONS_FILE);
    
    const subscriptionIndex = subscriptions.findIndex(s => s.stripeSubscriptionId === stripeSubscriptionId);

    if (subscriptionIndex === -1) {
      console.warn('Subscription not found for update:', stripeSubscriptionId);
      return null;
    }

    subscriptions[subscriptionIndex] = {
      ...subscriptions[subscriptionIndex],
      ...updates,
      updatedAt: new Date(),
    };

    await writeJsonFile(SUBSCRIPTIONS_FILE, subscriptions);

    console.log('Subscription updated:', {
      id: subscriptions[subscriptionIndex].id,
      stripeSubscriptionId,
      updates,
    });

    return subscriptions[subscriptionIndex];
  } catch (error) {
    console.error('Error updating subscription record:', error);
    throw new Error('Failed to update subscription record');
  }
}

/**
 * Log webhook event for debugging and audit trail
 */
export async function logWebhookEventData(event: {
  eventId: string;
  eventType: string;
  processed: boolean;
  data: any;
  error?: string;
}): Promise<void> {
  try {
    const events = await readJsonFile<any>(WEBHOOK_EVENTS_FILE);
    
    const webhookEvent = {
      id: generateId(),
      ...event,
      timestamp: new Date(),
    };

    events.push(webhookEvent);
    
    // Keep only last 1000 webhook events to prevent file from growing too large
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }

    await writeJsonFile(WEBHOOK_EVENTS_FILE, events);

    console.log('Webhook event logged:', {
      eventId: event.eventId,
      eventType: event.eventType,
      processed: event.processed,
    });
  } catch (error) {
    console.error('Error logging webhook event:', error);
    // Don't throw here as webhook event logging shouldn't break the main flow
  }
}