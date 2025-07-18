# Transaction Logging and Data Persistence

This module provides comprehensive transaction logging and data persistence functionality for the Stripe donation integration. It handles logging of donation transactions, subscription records, and webhook events, along with data retrieval functions for reporting and analytics.

## Overview

The transaction logging system consists of several key components:

1. **Transaction Storage** (`transaction-storage.ts`) - Core functions for logging and updating donation data
2. **Donation Reporting** (`donation-reporting.ts`) - Functions for retrieving and analyzing donation data
3. **API Routes** - REST endpoints for accessing donation data
4. **Webhook Integration** - Automatic logging of Stripe webhook events

## Data Storage

The system uses JSON file storage for simplicity and portability. In production, this can be easily replaced with a database solution.

### Storage Files

- `data/transactions.json` - Donation transaction records
- `data/subscriptions.json` - Subscription records
- `data/webhook-events.json` - Webhook event audit trail

### Data Models

#### DonationTransaction
```typescript
interface DonationTransaction {
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
```

#### SubscriptionRecord
```typescript
interface SubscriptionRecord {
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
```

## Core Functions

### Transaction Storage Functions

#### `logDonationTransaction(transaction)`
Logs a new donation transaction to storage.

```typescript
const transaction = await logDonationTransaction({
  stripeSessionId: 'cs_test_123',
  stripePaymentIntentId: 'pi_test_123',
  amount: 50.00,
  currency: 'usd',
  category: 'Tithes',
  type: 'oneoff',
  status: 'completed',
  customerEmail: 'donor@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

#### `updateTransactionStatus(identifier, status, metadata?)`
Updates the status of an existing transaction.

```typescript
const updated = await updateTransactionStatus(
  { stripePaymentIntentId: 'pi_test_123' },
  'completed',
  { completedAt: new Date().toISOString() }
);
```

#### `logSubscriptionRecord(subscription)`
Logs a new subscription record to storage.

```typescript
const subscription = await logSubscriptionRecord({
  stripeSubscriptionId: 'sub_test_123',
  stripeCustomerId: 'cus_test_123',
  amount: 25.00,
  currency: 'usd',
  category: 'Offerings',
  frequency: 'monthly',
  status: 'active',
  customerEmail: 'subscriber@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  nextPaymentDate: new Date(),
});
```

#### `updateSubscriptionRecord(stripeSubscriptionId, updates)`
Updates an existing subscription record.

```typescript
const updated = await updateSubscriptionRecord('sub_test_123', {
  status: 'cancelled',
  updatedAt: new Date(),
});
```

### Data Retrieval Functions

#### `getDonationTransactions(filters?, sort?, pagination?)`
Retrieves donation transactions with optional filtering, sorting, and pagination.

```typescript
const result = await getDonationTransactions(
  { category: 'Tithes', status: 'completed' },
  { field: 'createdAt', direction: 'desc' },
  { page: 1, limit: 10 }
);
```

#### `getDonationTransaction(identifier)`
Retrieves a specific donation transaction by ID or Stripe identifiers.

```typescript
const transaction = await getDonationTransaction({
  stripePaymentIntentId: 'pi_test_123'
});
```

#### `getDonationSummary(filters?)`
Generates summary statistics for donations.

```typescript
const summary = await getDonationSummary({
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
});
```

#### `getDonationAnalytics(startDate, endDate, compareWithPrevious?)`
Generates detailed analytics for a specific time period.

```typescript
const analytics = await getDonationAnalytics(
  new Date('2024-01-01'),
  new Date('2024-01-31'),
  true // Compare with previous period
);
```

## API Endpoints

### GET /api/donations
Retrieve donation transactions with filtering and pagination.

**Query Parameters:**
- `category` - Filter by donation category
- `type` - Filter by donation type (oneoff | recurring)
- `status` - Filter by transaction status
- `startDate` - Filter by start date (ISO string)
- `endDate` - Filter by end date (ISO string)
- `customerEmail` - Filter by customer email
- `sortField` - Sort field (createdAt | amount | category | status)
- `sortDirection` - Sort direction (asc | desc)
- `page` - Page number for pagination
- `limit` - Items per page
- `summary` - Return summary statistics (true | false)

**Examples:**
```bash
# Get all donations
GET /api/donations

# Get donations summary
GET /api/donations?summary=true

# Get filtered and paginated donations
GET /api/donations?category=Tithes&status=completed&page=1&limit=10

# Get donations sorted by amount
GET /api/donations?sortField=amount&sortDirection=desc
```

### GET /api/donations/[id]
Retrieve a specific donation transaction.

**Examples:**
```bash
# Get by transaction ID
GET /api/donations/test-id-123

# Get by Stripe Payment Intent ID
GET /api/donations/pi_test_123

# Get by Stripe Session ID
GET /api/donations/cs_test_123
```

### GET /api/donations/analytics
Get donation analytics for a specific time period.

**Query Parameters:**
- `startDate` - Start date (ISO string, required)
- `endDate` - End date (ISO string, required)
- `compareWithPrevious` - Compare with previous period (true | false)

**Examples:**
```bash
# Get monthly analytics
GET /api/donations/analytics?startDate=2024-01-01&endDate=2024-01-31

# Get analytics with comparison
GET /api/donations/analytics?startDate=2024-01-01&endDate=2024-01-31&compareWithPrevious=true
```

### GET /api/subscriptions
Retrieve subscription records with optional filtering.

**Query Parameters:**
- `status` - Filter by subscription status
- `category` - Filter by donation category
- `customerEmail` - Filter by customer email
- `subscriptionId` - Get specific subscription by Stripe ID

**Examples:**
```bash
# Get all active subscriptions
GET /api/subscriptions?status=active

# Get specific subscription
GET /api/subscriptions?subscriptionId=sub_test_123
```

## Webhook Integration

The webhook handlers automatically log transaction and subscription data when Stripe events are received:

### Supported Events

- `payment_intent.succeeded` - Logs completed one-time donations
- `payment_intent.payment_failed` - Logs failed one-time donations
- `customer.subscription.created` - Logs new subscriptions
- `customer.subscription.updated` - Updates subscription records
- `customer.subscription.deleted` - Marks subscriptions as cancelled
- `invoice.payment_succeeded` - Logs successful recurring payments
- `invoice.payment_failed` - Logs failed recurring payments
- `checkout.session.completed` - Logs successful checkout sessions
- `checkout.session.expired` - Logs expired checkout sessions

### Automatic Data Persistence

When webhook events are received, the system automatically:

1. Verifies the webhook signature
2. Processes the event data
3. Logs or updates transaction/subscription records
4. Stores webhook event data for audit trail
5. Handles errors gracefully without breaking webhook processing

## Error Handling

The system includes comprehensive error handling:

- **File System Errors** - Graceful handling of file read/write operations
- **Data Validation** - Validation of transaction and subscription data
- **Webhook Errors** - Proper error logging without breaking webhook flow
- **API Errors** - Structured error responses for API endpoints

## Security Considerations

- **Data Directory** - Added to `.gitignore` to prevent committing sensitive data
- **Webhook Verification** - All webhook events are signature-verified
- **Error Logging** - Sensitive data is not logged in error messages
- **API Access** - Consider adding authentication for production use

## Testing

The system includes comprehensive tests:

- **Unit Tests** - Test individual functions with mocked dependencies
- **Integration Tests** - Test complete workflows with real file operations
- **API Tests** - Test API endpoints with sample data

Run tests with:
```bash
npm test
```

## Production Considerations

For production deployment, consider:

1. **Database Migration** - Replace JSON file storage with a proper database
2. **Authentication** - Add authentication to API endpoints
3. **Rate Limiting** - Implement rate limiting for API endpoints
4. **Monitoring** - Add monitoring and alerting for transaction processing
5. **Backup** - Implement regular backups of transaction data
6. **Scaling** - Consider database indexing and query optimization

## Migration to Database

To migrate from JSON file storage to a database:

1. Create database tables matching the TypeScript interfaces
2. Replace file operations in `transaction-storage.ts` with database queries
3. Update connection handling and error management
4. Maintain the same function signatures for compatibility

Example database schema (PostgreSQL):

```sql
CREATE TABLE donation_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  category VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  frequency VARCHAR(20),
  status VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

CREATE TABLE subscription_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  category VARCHAR(50) NOT NULL,
  frequency VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  next_payment_date TIMESTAMP
);
```

This transaction logging system provides a solid foundation for donation tracking and reporting while maintaining flexibility for future enhancements and database migration.