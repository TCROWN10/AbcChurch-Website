/**
 * Tests for transaction storage functionality
 * These tests verify that donation transactions and subscriptions are properly logged and retrieved
 */

import { 
  logDonationTransaction, 
  updateTransactionStatus, 
  logSubscriptionRecord, 
  updateSubscriptionRecord,
  logWebhookEventData 
} from '../transaction-storage';
import { 
  getDonationTransaction, 
  getDonationTransactions, 
  getSubscriptionRecord,
  getDonationSummary 
} from '../donation-reporting';
import { DonationTransaction, SubscriptionRecord } from '@/types/stripe';
import { promises as fs } from 'fs';
import path from 'path';

// Test data directory
const TEST_DATA_DIR = path.join(process.cwd(), 'data-test');

// Mock the data directory for tests
jest.mock('fs', () => ({
  promises: {
    access: jest.fn(),
    mkdir: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe('Transaction Storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('logDonationTransaction', () => {
    it('should log a one-time donation transaction', async () => {
      const mockTransaction: Omit<DonationTransaction, 'id'> = {
        stripeSessionId: 'cs_test_123',
        stripePaymentIntentId: 'pi_test_123',
        amount: 50.00,
        currency: 'usd',
        category: 'Tithes',
        type: 'oneoff',
        status: 'completed',
        customerEmail: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: { test: 'data' },
      };

      // Mock file operations
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);

      const result = await logDonationTransaction(mockTransaction);

      expect(result).toMatchObject({
        ...mockTransaction,
        id: expect.any(String),
      });
      expect(fs.writeFile).toHaveBeenCalled();
    });

    it('should log a recurring donation transaction', async () => {
      const mockTransaction: Omit<DonationTransaction, 'id'> = {
        stripeSessionId: 'cs_test_456',
        stripeSubscriptionId: 'sub_test_456',
        amount: 25.00,
        currency: 'usd',
        category: 'Offerings',
        type: 'recurring',
        frequency: 'monthly',
        status: 'completed',
        customerEmail: 'recurring@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock file operations
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);

      const result = await logDonationTransaction(mockTransaction);

      expect(result).toMatchObject({
        ...mockTransaction,
        id: expect.any(String),
      });
      expect(result.type).toBe('recurring');
      expect(result.frequency).toBe('monthly');
    });
  });

  describe('updateTransactionStatus', () => {
    it('should update transaction status by payment intent ID', async () => {
      const existingTransaction: DonationTransaction = {
        id: 'test-id-123',
        stripeSessionId: 'cs_test_123',
        stripePaymentIntentId: 'pi_test_123',
        amount: 50.00,
        currency: 'usd',
        category: 'Tithes',
        type: 'oneoff',
        status: 'pending',
        customerEmail: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock reading existing transactions
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify([existingTransaction]));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const result = await updateTransactionStatus(
        { stripePaymentIntentId: 'pi_test_123' },
        'completed',
        { completedAt: new Date().toISOString() }
      );

      expect(result).toMatchObject({
        ...existingTransaction,
        status: 'completed',
        metadata: { completedAt: expect.any(String) },
      });
      expect(fs.writeFile).toHaveBeenCalled();
    });
  });

  describe('logSubscriptionRecord', () => {
    it('should log a subscription record', async () => {
      const mockSubscription: Omit<SubscriptionRecord, 'id'> = {
        stripeSubscriptionId: 'sub_test_789',
        stripeCustomerId: 'cus_test_789',
        amount: 100.00,
        currency: 'usd',
        category: 'Building Fund',
        frequency: 'weekly',
        status: 'active',
        customerEmail: 'subscriber@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        nextPaymentDate: new Date(),
      };

      // Mock file operations
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);

      const result = await logSubscriptionRecord(mockSubscription);

      expect(result).toMatchObject({
        ...mockSubscription,
        id: expect.any(String),
      });
      expect(result.status).toBe('active');
      expect(result.frequency).toBe('weekly');
    });
  });

  describe('logWebhookEventData', () => {
    it('should log webhook event data', async () => {
      const mockEvent = {
        eventId: 'evt_test_123',
        eventType: 'payment_intent.succeeded',
        processed: true,
        data: { id: 'pi_test_123', amount: 5000 },
      };

      // Mock file operations
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);

      await logWebhookEventData(mockEvent);

      expect(fs.writeFile).toHaveBeenCalled();
      const writeCall = (fs.writeFile as jest.Mock).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData).toHaveLength(1);
      expect(writtenData[0]).toMatchObject({
        ...mockEvent,
        id: expect.any(String),
        timestamp: expect.any(String),
      });
    });
  });
});

describe('Donation Reporting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDonationTransactions', () => {
    it('should retrieve and filter donation transactions', async () => {
      const mockTransactions: DonationTransaction[] = [
        {
          id: 'test-1',
          stripeSessionId: 'cs_test_1',
          amount: 50.00,
          currency: 'usd',
          category: 'Tithes',
          type: 'oneoff',
          status: 'completed',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: 'test-2',
          stripeSessionId: 'cs_test_2',
          amount: 25.00,
          currency: 'usd',
          category: 'Offerings',
          type: 'recurring',
          frequency: 'monthly',
          status: 'completed',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ] as DonationTransaction[];

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockTransactions));

      const result = await getDonationTransactions(
        { category: 'Tithes' },
        { field: 'createdAt', direction: 'desc' },
        { page: 1, limit: 10 }
      );

      expect(result.data).toHaveLength(1);
      expect(result.data[0].category).toBe('Tithes');
      expect(result.total).toBe(1);
    });
  });

  describe('getDonationSummary', () => {
    it('should generate donation summary statistics', async () => {
      const mockTransactions: DonationTransaction[] = [
        {
          id: 'test-1',
          stripeSessionId: 'cs_test_1',
          amount: 100.00,
          currency: 'usd',
          category: 'Tithes',
          type: 'oneoff',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'test-2',
          stripeSessionId: 'cs_test_2',
          amount: 50.00,
          currency: 'usd',
          category: 'Offerings',
          type: 'recurring',
          frequency: 'monthly',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ] as DonationTransaction[];

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockTransactions));

      const summary = await getDonationSummary();

      expect(summary.totalAmount).toBe(150.00);
      expect(summary.totalTransactions).toBe(2);
      expect(summary.averageAmount).toBe(75.00);
      expect(summary.byCategory).toHaveProperty('Tithes');
      expect(summary.byCategory).toHaveProperty('Offerings');
      expect(summary.byType).toHaveProperty('oneoff');
      expect(summary.byType).toHaveProperty('recurring');
    });
  });
});