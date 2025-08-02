import { DonationTransaction, SubscriptionRecord } from '@/types/stripe';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Data retrieval functions for donation reporting and analytics
 */

// Storage file paths
const TRANSACTIONS_FILE = 'data/transactions.json';
const SUBSCRIPTIONS_FILE = 'data/subscriptions.json';

/**
 * Read JSON file with error handling
 */
async function readJsonFile<T>(filePath: string): Promise<T[]> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const data = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

/**
 * Filter options for donation queries
 */
export interface DonationFilters {
  category?: string;
  type?: 'oneoff' | 'recurring';
  status?: DonationTransaction['status'];
  startDate?: Date;
  endDate?: Date;
  customerEmail?: string;
}

/**
 * Sorting options for donation queries
 */
export interface DonationSortOptions {
  field: 'createdAt' | 'amount' | 'category' | 'status';
  direction: 'asc' | 'desc';
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page: number;
  limit: number;
}

/**
 * Paginated results interface
 */
export interface PaginatedResults<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Get all donation transactions with optional filtering, sorting, and pagination
 */
export async function getDonationTransactions(
  filters?: DonationFilters,
  sort?: DonationSortOptions,
  pagination?: PaginationOptions
): Promise<PaginatedResults<DonationTransaction>> {
  try {
    let transactions = await readJsonFile<DonationTransaction>(TRANSACTIONS_FILE);

    // Apply filters
    if (filters) {
      transactions = transactions.filter(transaction => {
        if (filters.category && transaction.category !== filters.category) return false;
        if (filters.type && transaction.type !== filters.type) return false;
        if (filters.status && transaction.status !== filters.status) return false;
        if (filters.customerEmail && transaction.customerEmail !== filters.customerEmail) return false;
        
        if (filters.startDate) {
          const transactionDate = new Date(transaction.createdAt);
          if (transactionDate < filters.startDate) return false;
        }
        
        if (filters.endDate) {
          const transactionDate = new Date(transaction.createdAt);
          if (transactionDate > filters.endDate) return false;
        }
        
        return true;
      });
    }

    // Apply sorting
    if (sort) {
      transactions.sort((a, b) => {
        let aValue: any = a[sort.field];
        let bValue: any = b[sort.field];

        // Handle date sorting
        if (sort.field === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        // Handle string sorting
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sort.direction === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    // Apply pagination
    const total = transactions.length;
    let paginatedTransactions = transactions;

    if (pagination) {
      const startIndex = (pagination.page - 1) * pagination.limit;
      const endIndex = startIndex + pagination.limit;
      paginatedTransactions = transactions.slice(startIndex, endIndex);
    }

    return {
      data: paginatedTransactions,
      total,
      page: pagination?.page || 1,
      limit: pagination?.limit || total,
      totalPages: pagination ? Math.ceil(total / pagination.limit) : 1,
    };
  } catch (error) {
    console.error('Error retrieving donation transactions:', error);
    throw new Error('Failed to retrieve donation transactions');
  }
}

/**
 * Get donation transaction by ID or Stripe identifiers
 */
export async function getDonationTransaction(identifier: {
  id?: string;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
}): Promise<DonationTransaction | null> {
  try {
    const transactions = await readJsonFile<DonationTransaction>(TRANSACTIONS_FILE);
    
    const transaction = transactions.find(t => 
      (identifier.id && t.id === identifier.id) ||
      (identifier.stripePaymentIntentId && t.stripePaymentIntentId === identifier.stripePaymentIntentId) ||
      (identifier.stripeSessionId && t.stripeSessionId === identifier.stripeSessionId)
    );

    return transaction || null;
  } catch (error) {
    console.error('Error retrieving donation transaction:', error);
    throw new Error('Failed to retrieve donation transaction');
  }
}

/**
 * Get all subscription records with optional filtering
 */
export async function getSubscriptionRecords(
  filters?: {
    status?: SubscriptionRecord['status'];
    category?: string;
    customerEmail?: string;
  }
): Promise<SubscriptionRecord[]> {
  try {
    let subscriptions = await readJsonFile<SubscriptionRecord>(SUBSCRIPTIONS_FILE);

    // Apply filters
    if (filters) {
      subscriptions = subscriptions.filter(subscription => {
        if (filters.status && subscription.status !== filters.status) return false;
        if (filters.category && subscription.category !== filters.category) return false;
        if (filters.customerEmail && subscription.customerEmail !== filters.customerEmail) return false;
        return true;
      });
    }

    return subscriptions;
  } catch (error) {
    console.error('Error retrieving subscription records:', error);
    throw new Error('Failed to retrieve subscription records');
  }
}

/**
 * Get subscription record by Stripe subscription ID
 */
export async function getSubscriptionRecord(stripeSubscriptionId: string): Promise<SubscriptionRecord | null> {
  try {
    const subscriptions = await readJsonFile<SubscriptionRecord>(SUBSCRIPTIONS_FILE);
    const subscription = subscriptions.find(s => s.stripeSubscriptionId === stripeSubscriptionId);
    return subscription || null;
  } catch (error) {
    console.error('Error retrieving subscription record:', error);
    throw new Error('Failed to retrieve subscription record');
  }
}

/**
 * Generate donation summary statistics
 */
export interface DonationSummary {
  totalAmount: number;
  totalTransactions: number;
  averageAmount: number;
  byCategory: Record<string, { amount: number; count: number }>;
  byType: Record<string, { amount: number; count: number }>;
  byStatus: Record<string, { amount: number; count: number }>;
  recentTransactions: DonationTransaction[];
}

export async function getDonationSummary(
  filters?: DonationFilters
): Promise<DonationSummary> {
  try {
    const result = await getDonationTransactions(filters);
    const transactions = result.data;

    const summary: DonationSummary = {
      totalAmount: 0,
      totalTransactions: transactions.length,
      averageAmount: 0,
      byCategory: {},
      byType: {},
      byStatus: {},
      recentTransactions: [],
    };

    // Calculate totals and group by various fields
    transactions.forEach(transaction => {
      summary.totalAmount += transaction.amount;

      // Group by category
      if (!summary.byCategory[transaction.category]) {
        summary.byCategory[transaction.category] = { amount: 0, count: 0 };
      }
      summary.byCategory[transaction.category].amount += transaction.amount;
      summary.byCategory[transaction.category].count += 1;

      // Group by type
      if (!summary.byType[transaction.type]) {
        summary.byType[transaction.type] = { amount: 0, count: 0 };
      }
      summary.byType[transaction.type].amount += transaction.amount;
      summary.byType[transaction.type].count += 1;

      // Group by status
      if (!summary.byStatus[transaction.status]) {
        summary.byStatus[transaction.status] = { amount: 0, count: 0 };
      }
      summary.byStatus[transaction.status].amount += transaction.amount;
      summary.byStatus[transaction.status].count += 1;
    });

    // Calculate average
    summary.averageAmount = summary.totalTransactions > 0 
      ? summary.totalAmount / summary.totalTransactions 
      : 0;

    // Get recent transactions (last 10)
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    summary.recentTransactions = sortedTransactions.slice(0, 10);

    return summary;
  } catch (error) {
    console.error('Error generating donation summary:', error);
    throw new Error('Failed to generate donation summary');
  }
}

/**
 * Get donation analytics for a specific time period
 */
export interface DonationAnalytics {
  period: string;
  totalAmount: number;
  transactionCount: number;
  averageAmount: number;
  topCategories: Array<{ category: string; amount: number; count: number }>;
  growthRate?: number; // Compared to previous period
}

export async function getDonationAnalytics(
  startDate: Date,
  endDate: Date,
  compareWithPrevious: boolean = false
): Promise<DonationAnalytics> {
  try {
    const filters: DonationFilters = {
      startDate,
      endDate,
      status: 'completed', // Only include completed transactions
    };

    const result = await getDonationTransactions(filters);
    const transactions = result.data;

    const analytics: DonationAnalytics = {
      period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
      totalAmount: 0,
      transactionCount: transactions.length,
      averageAmount: 0,
      topCategories: [],
    };

    // Calculate totals
    const categoryTotals: Record<string, { amount: number; count: number }> = {};
    
    transactions.forEach(transaction => {
      analytics.totalAmount += transaction.amount;
      
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = { amount: 0, count: 0 };
      }
      categoryTotals[transaction.category].amount += transaction.amount;
      categoryTotals[transaction.category].count += 1;
    });

    analytics.averageAmount = analytics.transactionCount > 0 
      ? analytics.totalAmount / analytics.transactionCount 
      : 0;

    // Sort categories by amount
    analytics.topCategories = Object.entries(categoryTotals)
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.amount - a.amount);

    // Calculate growth rate if requested
    if (compareWithPrevious) {
      const periodLength = endDate.getTime() - startDate.getTime();
      const previousStartDate = new Date(startDate.getTime() - periodLength);
      const previousEndDate = new Date(startDate.getTime());

      const previousFilters: DonationFilters = {
        startDate: previousStartDate,
        endDate: previousEndDate,
        status: 'completed',
      };

      const previousResult = await getDonationTransactions(previousFilters);
      const previousTotal = previousResult.data.reduce((sum, t) => sum + t.amount, 0);

      if (previousTotal > 0) {
        analytics.growthRate = ((analytics.totalAmount - previousTotal) / previousTotal) * 100;
      }
    }

    return analytics;
  } catch (error) {
    console.error('Error generating donation analytics:', error);
    throw new Error('Failed to generate donation analytics');
  }
}