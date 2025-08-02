/**
 * Manual test utilities for the Stripe Subscription API
 * This file contains test cases that can be run manually to verify the API functionality
 */

import { SubscriptionRequest } from '@/types/stripe';

// Test data for different scenarios
export const subscriptionTestCases = {
  validMonthlySubscription: {
    amount: 50.00,
    category: 'Tithes',
    frequency: 'monthly',
    email: 'test@example.com'
  } as SubscriptionRequest,

  validWeeklySubscription: {
    amount: 25.00,
    category: 'Offerings',
    frequency: 'weekly',
    email: 'weekly@example.com'
  } as SubscriptionRequest,

  validYearlySubscription: {
    amount: 500.00,
    category: 'Building Fund',
    frequency: 'yearly',
    email: 'yearly@example.com'
  } as SubscriptionRequest,

  existingCustomer: {
    amount: 75.00,
    category: 'Missions',
    frequency: 'monthly',
    customerId: 'cus_existing123'
  } as SubscriptionRequest,

  missingFrequency: {
    amount: 50.00,
    category: 'Tithes',
    email: 'test@example.com'
    // Missing frequency
  } as Partial<SubscriptionRequest>,

  missingEmailAndCustomer: {
    amount: 50.00,
    category: 'Tithes',
    frequency: 'monthly'
    // Missing both email and customerId
  } as Partial<SubscriptionRequest>,

  invalidAmount: {
    amount: 0.25, // Below Stripe minimum
    category: 'Tithes',
    frequency: 'monthly',
    email: 'test@example.com'
  } as SubscriptionRequest,
};

/**
 * Manual test function to validate Subscription API responses
 * Run this in a browser console or Node.js environment
 */
export async function testSubscriptionAPI(baseUrl: string = 'http://localhost:3000') {
  const apiUrl = `${baseUrl}/api/stripe/subscription`;
  
  console.log('Testing Stripe Subscription API...');
  
  // Test 1: Valid monthly subscription
  try {
    console.log('\n1. Testing valid monthly subscription...');
    const response1 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionTestCases.validMonthlySubscription)
    });
    
    const result1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', result1);
    
    if (response1.ok && result1.subscriptionId && result1.customerId) {
      console.log('✅ Valid monthly subscription test passed');
    } else {
      console.log('❌ Valid monthly subscription test failed');
    }
  } catch (error) {
    console.log('❌ Valid monthly subscription test error:', error);
  }

  // Test 2: Valid weekly subscription
  try {
    console.log('\n2. Testing valid weekly subscription...');
    const response2 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionTestCases.validWeeklySubscription)
    });
    
    const result2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', result2);
    
    if (response2.ok && result2.subscriptionId && result2.customerId) {
      console.log('✅ Valid weekly subscription test passed');
    } else {
      console.log('❌ Valid weekly subscription test failed');
    }
  } catch (error) {
    console.log('❌ Valid weekly subscription test error:', error);
  }

  // Test 3: Valid yearly subscription
  try {
    console.log('\n3. Testing valid yearly subscription...');
    const response3 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionTestCases.validYearlySubscription)
    });
    
    const result3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', result3);
    
    if (response3.ok && result3.subscriptionId && result3.customerId) {
      console.log('✅ Valid yearly subscription test passed');
    } else {
      console.log('❌ Valid yearly subscription test failed');
    }
  } catch (error) {
    console.log('❌ Valid yearly subscription test error:', error);
  }

  // Test 4: Missing frequency
  try {
    console.log('\n4. Testing missing frequency...');
    const response4 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionTestCases.missingFrequency)
    });
    
    const result4 = await response4.json();
    console.log('Status:', response4.status);
    console.log('Response:', result4);
    
    if (response4.status === 400 && result4.error && result4.error.includes('Frequency is required')) {
      console.log('✅ Missing frequency test passed');
    } else {
      console.log('❌ Missing frequency test failed');
    }
  } catch (error) {
    console.log('❌ Missing frequency test error:', error);
  }

  // Test 5: Missing email and customer ID
  try {
    console.log('\n5. Testing missing email and customer ID...');
    const response5 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionTestCases.missingEmailAndCustomer)
    });
    
    const result5 = await response5.json();
    console.log('Status:', response5.status);
    console.log('Response:', result5);
    
    if (response5.status === 400 && result5.error && result5.error.includes('Email or customer ID is required')) {
      console.log('✅ Missing email and customer ID test passed');
    } else {
      console.log('❌ Missing email and customer ID test failed');
    }
  } catch (error) {
    console.log('❌ Missing email and customer ID test error:', error);
  }

  // Test 6: Invalid amount
  try {
    console.log('\n6. Testing invalid amount...');
    const response6 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionTestCases.invalidAmount)
    });
    
    const result6 = await response6.json();
    console.log('Status:', response6.status);
    console.log('Response:', result6);
    
    if (response6.status === 400 && result6.error) {
      console.log('✅ Invalid amount test passed');
    } else {
      console.log('❌ Invalid amount test failed');
    }
  } catch (error) {
    console.log('❌ Invalid amount test error:', error);
  }

  console.log('\nSubscription API testing completed!');
}

/**
 * Test subscription retrieval functionality
 */
export async function testSubscriptionRetrieval(baseUrl: string = 'http://localhost:3000') {
  const apiUrl = `${baseUrl}/api/stripe/subscription`;
  
  console.log('Testing Subscription Retrieval API...');

  // Test 1: Get subscription by ID (requires a real subscription ID)
  try {
    console.log('\n1. Testing get subscription by ID...');
    const testSubscriptionId = 'sub_test123'; // Replace with actual subscription ID for testing
    const response1 = await fetch(`${apiUrl}?subscriptionId=${testSubscriptionId}`);
    
    const result1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', result1);
    
    if (response1.ok && result1.subscription) {
      console.log('✅ Get subscription by ID test passed');
    } else {
      console.log('❌ Get subscription by ID test failed (may need real subscription ID)');
    }
  } catch (error) {
    console.log('❌ Get subscription by ID test error:', error);
  }

  // Test 2: Get subscriptions by customer ID (requires a real customer ID)
  try {
    console.log('\n2. Testing get subscriptions by customer ID...');
    const testCustomerId = 'cus_test123'; // Replace with actual customer ID for testing
    const response2 = await fetch(`${apiUrl}?customerId=${testCustomerId}`);
    
    const result2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', result2);
    
    if (response2.ok && result2.subscriptions) {
      console.log('✅ Get subscriptions by customer ID test passed');
    } else {
      console.log('❌ Get subscriptions by customer ID test failed (may need real customer ID)');
    }
  } catch (error) {
    console.log('❌ Get subscriptions by customer ID test error:', error);
  }

  // Test 3: Missing parameters
  try {
    console.log('\n3. Testing missing parameters...');
    const response3 = await fetch(apiUrl);
    
    const result3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', result3);
    
    if (response3.status === 400 && result3.error && result3.error.includes('Subscription ID or Customer ID is required')) {
      console.log('✅ Missing parameters test passed');
    } else {
      console.log('❌ Missing parameters test failed');
    }
  } catch (error) {
    console.log('❌ Missing parameters test error:', error);
  }

  console.log('\nSubscription Retrieval API testing completed!');
}

/**
 * Test subscription management functionality (update/cancel)
 */
export async function testSubscriptionManagement(baseUrl: string = 'http://localhost:3000') {
  const apiUrl = `${baseUrl}/api/stripe/subscription`;
  
  console.log('Testing Subscription Management API...');

  // Test 1: Update subscription (requires a real subscription ID)
  try {
    console.log('\n1. Testing update subscription...');
    const testSubscriptionId = 'sub_test123'; // Replace with actual subscription ID for testing
    const updateData = {
      subscriptionId: testSubscriptionId,
      metadata: { updated: 'true', testRun: new Date().toISOString() }
    };
    
    const response1 = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    
    const result1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', result1);
    
    if (response1.ok && result1.subscriptionId) {
      console.log('✅ Update subscription test passed');
    } else {
      console.log('❌ Update subscription test failed (may need real subscription ID)');
    }
  } catch (error) {
    console.log('❌ Update subscription test error:', error);
  }

  // Test 2: Cancel subscription at period end (requires a real subscription ID)
  try {
    console.log('\n2. Testing cancel subscription at period end...');
    const testSubscriptionId = 'sub_test123'; // Replace with actual subscription ID for testing
    const response2 = await fetch(`${apiUrl}?subscriptionId=${testSubscriptionId}&cancelAtPeriodEnd=true`, {
      method: 'DELETE'
    });
    
    const result2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', result2);
    
    if (response2.ok && result2.subscriptionId) {
      console.log('✅ Cancel subscription at period end test passed');
    } else {
      console.log('❌ Cancel subscription at period end test failed (may need real subscription ID)');
    }
  } catch (error) {
    console.log('❌ Cancel subscription at period end test error:', error);
  }

  // Test 3: Missing subscription ID for update
  try {
    console.log('\n3. Testing missing subscription ID for update...');
    const response3 = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metadata: { test: 'true' } })
    });
    
    const result3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', result3);
    
    if (response3.status === 400 && result3.error && result3.error.includes('Subscription ID is required')) {
      console.log('✅ Missing subscription ID for update test passed');
    } else {
      console.log('❌ Missing subscription ID for update test failed');
    }
  } catch (error) {
    console.log('❌ Missing subscription ID for update test error:', error);
  }

  // Test 4: Missing subscription ID for cancel
  try {
    console.log('\n4. Testing missing subscription ID for cancel...');
    const response4 = await fetch(apiUrl, {
      method: 'DELETE'
    });
    
    const result4 = await response4.json();
    console.log('Status:', response4.status);
    console.log('Response:', result4);
    
    if (response4.status === 400 && result4.error && result4.error.includes('Subscription ID is required')) {
      console.log('✅ Missing subscription ID for cancel test passed');
    } else {
      console.log('❌ Missing subscription ID for cancel test failed');
    }
  } catch (error) {
    console.log('❌ Missing subscription ID for cancel test error:', error);
  }

  console.log('\nSubscription Management API testing completed!');
}

// Export for manual testing
if (typeof window !== 'undefined') {
  (window as any).testSubscriptionAPI = testSubscriptionAPI;
  (window as any).testSubscriptionRetrieval = testSubscriptionRetrieval;
  (window as any).testSubscriptionManagement = testSubscriptionManagement;
  console.log('Subscription API test functions are available in the browser console:');
  console.log('- testSubscriptionAPI()');
  console.log('- testSubscriptionRetrieval()');
  console.log('- testSubscriptionManagement()');
}