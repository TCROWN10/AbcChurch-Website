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
  line_items: Array<{
    description: string | null;
    amount_total: number | null;
    formatted_amount: string | null;
    quantity: number | null;
  }>;
  subscription: {
    id: string;
    status: string | null;
    current_period_end: number | null;
  } | null;
  payment_intent: {
    id: string;
    status: string | null;
  } | null;
}

interface ErrorState {
  message: string;
  canRetry: boolean;
}

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError({
        message: 'No session information found. Please check your email for confirmation.',
        canRetry: false
      });
      setLoading(false);
      return;
    }

    fetchSessionData();
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/stripe/session?session_id=${sessionId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Session not found or has expired');
        }
        throw new Error('Failed to retrieve donation information');
      }
      
      const data = await response.json();
      setSessionData(data);
    } catch (err) {
      console.error('Error fetching session data:', err);
      setError({
        message: err instanceof Error ? err.message : 'Failed to load donation details',
        canRetry: true
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFrequencyText = (frequency?: string) => {
    switch (frequency) {
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading donation details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
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
              Unable to Load Details
            </h1>
            <p className="text-gray-600 mb-4">
              {error.message}
            </p>
          </div>

          <div className="space-y-3">
            {error.canRetry && (
              <button
                onClick={fetchSessionData}
                className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            )}
            <a
              href="/donate"
              className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Make Another Donation
            </a>
            <a
              href="/"
              className="block w-full text-gray-500 py-2 px-4 hover:text-gray-700 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h1>
            <p className="text-gray-600">
              Your donation has been processed successfully.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              You will receive a confirmation email shortly with your donation receipt.
            </p>
            <p className="text-sm text-gray-600">
              Your generosity helps us continue our mission and serve our community.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/donate"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Make Another Donation
            </a>
            <a
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  const isRecurring = sessionData.mode === 'subscription';
  const category = sessionData.metadata?.category || 'General';
  const frequency = sessionData.metadata?.frequency;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h1>
          <p className="text-gray-600">
            Your {isRecurring ? 'recurring donation' : 'donation'} has been processed successfully.
          </p>
        </div>

        {/* Donation Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-gray-900">
                {sessionData.formatted_amount || 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-semibold text-gray-900">{category}</span>
            </div>
            
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
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold text-gray-900">
                {formatDate(sessionData.created)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600 capitalize">
                {sessionData.payment_status}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
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
                {sessionData.customer_email 
                  ? 'A confirmation email has been sent to your email address with your donation receipt.'
                  : 'Your donation has been processed successfully.'
                }
              </p>
              {isRecurring && (
                <p className="text-sm text-blue-800">
                  Your recurring donation will continue {getFrequencyText(frequency).toLowerCase()} until you choose to cancel it.
                </p>
              )}
              <p className="text-sm text-blue-800 mt-2">
                Your generosity helps us continue our mission and serve our community.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="/donate"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            Make Another Donation
          </a>
          <a
            href="/"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}