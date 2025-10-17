import { Suspense } from 'react';
import { Metadata } from 'next';
import SuccessContent from './SuccessContent';

export const metadata: Metadata = {
  title: 'Donation Successful - All Believers Christian Church',
  description: 'Thank you for your generous donation to All Believers Christian Church.',
};

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}