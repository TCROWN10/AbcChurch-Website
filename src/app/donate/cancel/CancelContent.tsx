'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface SessionData {
  id: string;
  status: string;
  payment_status: string;
  amount_total: number | null;
  currency: string | null;
  customer_email: string | null;
  mode: string;
  metadata: Record<string, string>;
  created: number;
  formatted_amount: string | null;
}

interface ErrorState {
  message: string;
  canRetry: boolean;
}

export default function CancelContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/stripe/session?session_id=${sessionId}`);
      
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
      }
      // If session fetch fails, we'll just show generic cancel message
    } catch (err) {
      console.error('Error fetching session data:', err);
      // Don't show error for cancel page - just show generic message
    } finally {
      setLoading(false);
    }
  };

  const getFrequencyText = (frequency?: string) => {
    switch (frequency) {
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
      default: return '';
    }
  };

  const handleRetryDonation = () => {
    // If we have session data, we can pre-populate the form
    if (sessionData?.metadata) {
      const params = new URLSearchParams();
      
      if (sessionData.metadata.category) {
        params.set('category', sessionData.metadata.category);
      }
      if (sessionData.metadata.type) {
        params.set('type', sessionData.metadata.type);
      }
      if (sessionData.metadata.frequency) {
        params.set('frequency', sessionData.metadata.frequency);
      }
      if (sessionData.formatted_amount) {
        // Extract numeric amount from formatted string
        const amount = sessionData.formatted_amount.replace(/[^0-9.]/g, '');
        if (amount) {
          params.set('amount', amount);
        }
      }
      if (sessionData.customer_email) {
        params.set('email', sessionData.customer_email);
      }
      
      const queryString = params.toString();
      window.location.href = `/donate${queryString ? `?${queryString}` : ''}`;
    } else {
      window.location.href = '/donate';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const isRecurring = sessionData?.mode === 'subscription';
  const category = sessionData?.metadata?.category || null;
  const frequency = sessionData?.metadata?.frequency;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        {/* Cancel Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Donation Cancelled
          </h1>
          <p className="text-gray-600">
            Your donation was not processed. No charges were made to your account.
          </p>
        </div>

        {/* Session Details (if available) */}
        {sessionData && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cancelled Donation Details</h2>
            
            <div className="space-y-3">
              {sessionData.formatted_amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900">
                    {sessionData.formatted_amount}
                  </span>
                </div>
              )}
              
              {category && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold text-gray-900">{category}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold text-gray-900">
                  {isRecurring ? `${getFrequencyText(frequency)} Recurring` : 'One-time'}
                </span>
              </div>
              
              {sessionData.customer_email && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{sessionData.customer_email}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-blue-800 mb-2">
                Don't worry - you can try again anytime. No charges were made to your payment method.
              </p>
              <p className="text-sm text-blue-800 mb-2">
                If you experienced any technical issues during the payment process, please try again or contact us for assistance.
              </p>
              <p className="text-sm text-blue-800">
                Your support means a lot to us and helps us continue our mission to serve our community.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetryDonation}
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            {sessionData ? 'Try Again with Same Details' : 'Try Again'}
          </button>
          <a
            href="/donate"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
          >
            Start New Donation
          </a>
          <a
            href="/connect"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
          >
            Contact Us for Help
          </a>
          <a
            href="/"
            className="block w-full text-gray-500 py-3 px-4 hover:text-gray-700 transition-colors text-center font-medium"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}