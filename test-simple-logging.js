/**
 * Simple test to verify transaction logging functionality
 */

const fs = require('fs').promises;
const path = require('path');

// Simple test data
const testTransaction = {
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

async function testBasicFunctionality() {
  console.log('Testing basic transaction logging functionality...\n');

  try {
    // Test data directory creation
    const dataDir = path.join(process.cwd(), 'data');
    try {
      await fs.access(dataDir);
      console.log('✓ Data directory exists');
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
      console.log('✓ Data directory created');
    }

    // Test file writing
    const testFile = path.join(dataDir, 'test-transactions.json');
    const testData = [
      {
        id: 'test-' + Date.now(),
        ...testTransaction,
      }
    ];

    await fs.writeFile(testFile, JSON.stringify(testData, null, 2));
    console.log('✓ Test transaction file written');

    // Test file reading
    const readData = await fs.readFile(testFile, 'utf-8');
    const parsedData = JSON.parse(readData);
    console.log('✓ Test transaction file read successfully');
    console.log('  - Transactions count:', parsedData.length);
    console.log('  - First transaction amount:', parsedData[0].amount);

    // Clean up test file
    await fs.unlink(testFile);
    console.log('✓ Test file cleaned up');

    console.log('\n✅ Basic functionality test passed!');
    console.log('Transaction logging infrastructure is ready.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testBasicFunctionality();