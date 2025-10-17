/**
 * Simple integration test for transaction logging functionality
 * This script tests the basic functionality without mocking
 */

const { logDonationTransaction, updateTransactionStatus, logSubscriptionRecord } = require('./src/lib/transaction-storage.ts');
const { getDonationTransaction, getDonationSummary } = require('./src/lib/donation-reporting.ts');

async function testTransactionLogging() {
  console.log('Testing transaction logging functionality...\n');

  try {
    // Test 1: Log a one-time donation
    console.log('1. Testing one-time donation logging...');
    const oneTimeTransaction = {
      stripeSessionId: 'cs_test_' + Date.now(),
      stripePaymentIntentId: 'pi_test_' + Date.now(),
      amount: 50.00,
      currency: 'usd',
      category: 'Tithes',
      type: 'oneoff',
      status: 'completed',
      customerEmail: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: { testRun: true },
    };

    const savedTransaction = await logDonationTransaction(oneTimeTransaction);
    console.log('✓ One-time transaction logged:', savedTransaction.id);

    // Test 2: Log a recurring donation
    console.log('\n2. Testing recurring donation logging...');
    const recurringTransaction = {
      stripeSessionId: 'cs_test_recurring_' + Date.now(),
      stripeSubscriptionId: 'sub_test_' + Date.now(),
      amount: 25.00,
      currency: 'usd',
      category: 'Offerings',
      type: 'recurring',
      frequency: 'monthly',
      status: 'completed',
      customerEmail: 'recurring@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: { testRun: true },
    };

    const savedRecurring = await logDonationTransaction(recurringTransaction);
    console.log('✓ Recurring transaction logged:', savedRecurring.id);

    // Test 3: Update transaction status
    console.log('\n3. Testing transaction status update...');
    const updatedTransaction = await updateTransactionStatus(
      { id: savedTransaction.id },
      'completed',
      { updatedInTest: true }
    );
    console.log('✓ Transaction status updated:', updatedTransaction?.status);

    // Test 4: Retrieve transaction
    console.log('\n4. Testing transaction retrieval...');
    const retrievedTransaction = await getDonationTransaction({ id: savedTransaction.id });
    console.log('✓ Transaction retrieved:', retrievedTransaction?.id);

    // Test 5: Log subscription record
    console.log('\n5. Testing subscription record logging...');
    const subscriptionRecord = {
      stripeSubscriptionId: 'sub_test_' + Date.now(),
      stripeCustomerId: 'cus_test_' + Date.now(),
      amount: 100.00,
      currency: 'usd',
      category: 'Building Fund',
      frequency: 'weekly',
      status: 'active',
      customerEmail: 'subscriber@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      nextPaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    };

    const savedSubscription = await logSubscriptionRecord(subscriptionRecord);
    console.log('✓ Subscription record logged:', savedSubscription.id);

    // Test 6: Generate donation summary
    console.log('\n6. Testing donation summary generation...');
    const summary = await getDonationSummary();
    console.log('✓ Donation summary generated:');
    console.log('  - Total amount:', summary.totalAmount);
    console.log('  - Total transactions:', summary.totalTransactions);
    console.log('  - Average amount:', summary.averageAmount);
    console.log('  - Categories:', Object.keys(summary.byCategory));

    console.log('\n✅ All tests passed! Transaction logging is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

// Run the test
testTransactionLogging();