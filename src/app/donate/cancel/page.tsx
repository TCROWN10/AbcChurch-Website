import { Suspense } from 'react';
import { Metadata } from 'next';
import CancelContent from './CancelContent';

export const metadata: Metadata = {
  title: 'Donation Cancelled - All Believers Christian Church',
  description: 'Your donation was cancelled. You can try again anytime.',
};

export default function CancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}