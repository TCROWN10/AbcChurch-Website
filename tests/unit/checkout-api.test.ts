/**
 * Manual test utilities for the Stripe Checkout API
 * This file contains test cases that can be run manually to verify the API functionality
 */

import { CheckoutRequest } from '@/types/stripe';

// Test data for different scenarios
export const testCases = {
  validOneTimePayment: {
    amount: 25.00,
    category: 'Tithes',
    type: 'payment' as const,
    email: 'test@example.com'
  } as CheckoutRequest,

  validRecurringPayment: {
    amount: 50.00,
    category: 'Offerings',
    type: 'subscription' as const,
    frequency: 'monthly',
    email: 'test@example.com'
  } as CheckoutRequest,

  invalidAmount: {
    amount: 0.25, // Below Stripe minimum
    category: 'Tithes',
    type: 'payment' as const,
  } as CheckoutRequest,

  invalidCategory: {
    amount: 25.00,
    category: 'InvalidCategory',
    type: 'payment' as const,
  } as CheckoutRequest,

  missingFrequency: {
    amount: 25.00,
    category: 'Tithes',
    type: 'subscription' as const,
    // Missing frequency for subscription
  } as CheckoutRequest,
};

/**
 * Manual test function to validate API responses
 * Run this in a browser console or Node.js environment
 */
export async function testCheckoutAPI(baseUrl: string = 'http://localhost:3000') {
  const apiUrl = `${baseUrl}/api/stripe/checkout`;
  
  console.log('Testing Stripe Checkout API...');
  
  // Test 1: Valid one-time payment
  try {
    console.log('\n1. Testing valid one-time payment...');
    const response1 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCases.validOneTimePayment)
    });
    
    const result1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', result1);
    
    if (response1.ok && result1.sessionId && result1.url) {
      console.log('✅ Valid one-time payment test passed');
    } else {
      console.log('❌ Valid one-time payment test failed');
    }
  } catch (error) {
    console.log('❌ Valid one-time payment test error:', error);
  }

  // Test 2: Valid recurring payment
  try {
    console.log('\n2. Testing valid recurring payment...');
    const response2 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCases.validRecurringPayment)
    });
    
    const result2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', result2);
    
    if (response2.ok && result2.sessionId && result2.url) {
      console.log('✅ Valid recurring payment test passed');
    } else {
      console.log('❌ Valid recurring payment test failed');
    }
  } catch (error) {
    console.log('❌ Valid recurring payment test error:', error);
  }

  // Test 3: Invalid amount
  try {
    console.log('\n3. Testing invalid amount...');
    const response3 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCases.invalidAmount)
    });
    
    const result3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', result3);
    
    if (response3.status === 400 && result3.error) {
      console.log('✅ Invalid amount test passed');
    } else {
      console.log('❌ Invalid amount test failed');
    }
  } catch (error) {
    console.log('❌ Invalid amount test error:', error);
  }

  // Test 4: Missing frequency for subscription
  try {
    console.log('\n4. Testing missing frequency for subscription...');
    const response4 = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCases.missingFrequency)
    });
    
    const result4 = await response4.json();
    console.log('Status:', response4.status);
    console.log('Response:', result4);
    
    if (response4.status === 400 && result4.error) {
      console.log('✅ Missing frequency test passed');
    } else {
      console.log('❌ Missing frequency test failed');
    }
  } catch (error) {
    console.log('❌ Missing frequency test error:', error);
  }

  // Test 5: Unsupported method (GET)
  try {
    console.log('\n5. Testing unsupported method (GET)...');
    const response5 = await fetch(apiUrl, {
      method: 'GET',
    });
    
    const result5 = await response5.json();
    console.log('Status:', response5.status);
    console.log('Response:', result5);
    
    if (response5.status === 405 && result5.error === 'Method not allowed') {
      console.log('✅ Unsupported method test passed');
    } else {
      console.log('❌ Unsupported method test failed');
    }
  } catch (error) {
    console.log('❌ Unsupported method test error:', error);
  }

  console.log('\nAPI testing completed!');
}

// Export for manual testing
if (typeof window !== 'undefined') {
  (window as any).testCheckoutAPI = testCheckoutAPI;
  console.log('testCheckoutAPI function is available in the browser console');
}