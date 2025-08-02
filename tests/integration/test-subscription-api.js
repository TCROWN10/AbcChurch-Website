// Simple test script to verify the subscription API is working
const testSubscriptionAPI = async () => {
    const apiUrl = 'http://localhost:3000/api/stripe/subscription';

    console.log('Testing Subscription API...');

    // Test with missing parameters to verify error handling
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 50,
                category: 'Tithes',
                // Missing frequency and email - should return validation error
            })
        });

        const result = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', result);

        if (response.status === 400 && result.error) {
            console.log('✅ API is responding correctly with validation errors');
        } else {
            console.log('❌ API response unexpected');
        }
    } catch (error) {
        console.log('❌ API test error:', error);
    }
};

// Run the test
testSubscriptionAPI();