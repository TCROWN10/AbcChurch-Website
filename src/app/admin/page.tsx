"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import {
  useGetProfileQuery,
  useGetAllUsersQuery,
  useGetAllDonationsQuery,
  useGetDonationStatsQuery,
  useGetPrayerRequestsQuery,
  useGetMessagesQuery,
  useGetFinancialSummaryQuery,
  useGetBirthdayAnalyticsQuery,
} from '@/store';
import DashboardOverview from '@/components/admin/DashboardOverview';
import UsersManagement from '@/components/admin/UsersManagement';
import DonationsManagement from '@/components/admin/DonationsManagement';
import PrayerRequestsManagement from '@/components/admin/PrayerRequestsManagement';
import MessagesManagement from '@/components/admin/MessagesManagement';
import FinancialReports from '@/components/admin/FinancialReports';
import AnalyticsSection from '@/components/admin/AnalyticsSection';

type TabType = 'overview' | 'users' | 'donations' | 'prayer-requests' | 'messages' | 'financial' | 'analytics';

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/signin');
      return;
    }

    // Check if user has admin role
    if (!profileLoading && profile) {
      const isAdmin = profile.role === 'ADMIN' || profile.role === 'SUPER_ADMIN';
      if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, authLoading, profile, profileLoading, router]);

  const isAdmin = profile?.role === 'ADMIN' || profile?.role === 'SUPER_ADMIN';

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF602E]"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-[#FF602E] text-white rounded-md hover:opacity-90 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: '📊' },
    { id: 'users' as TabType, label: 'Users', icon: '👥' },
    { id: 'donations' as TabType, label: 'Donations', icon: '💰' },
    { id: 'prayer-requests' as TabType, label: 'Prayer Requests', icon: '🙏' },
    { id: 'messages' as TabType, label: 'Messages', icon: '📝' },
    { id: 'financial' as TabType, label: 'Financial', icon: '📈' },
    { id: 'analytics' as TabType, label: 'Analytics', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user.name || user.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-[#FF602E] text-white text-sm font-semibold rounded-full">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#FF602E] text-[#FF602E]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <DashboardOverview />}
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'donations' && <DonationsManagement />}
        {activeTab === 'prayer-requests' && <PrayerRequestsManagement />}
        {activeTab === 'messages' && <MessagesManagement />}
        {activeTab === 'financial' && <FinancialReports />}
        {activeTab === 'analytics' && <AnalyticsSection />}
      </div>
    </div>
  );
}
