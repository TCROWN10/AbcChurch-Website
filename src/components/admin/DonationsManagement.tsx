"use client";
import { useState } from 'react';
import {
  useGetAllDonationsQuery,
  useGetDonationStatsQuery,
  useGetDonationSubscriptionsQuery,
} from '@/store';
import type { DonationType } from '@/types/api';

export default function DonationsManagement() {
  const [filterType, setFilterType] = useState<DonationType | ''>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [subStatus, setSubStatus] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [subEmail, setSubEmail] = useState<string>('');

  const { data: donations, isLoading } = useGetAllDonationsQuery({
    type: filterType || undefined,
    status: filterStatus || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const { data: stats } = useGetDonationStatsQuery({
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const { data: subscriptionPayload, isLoading: subsLoading } = useGetDonationSubscriptionsQuery({
    status: subStatus || undefined,
    category: subCategory || undefined,
    customerEmail: subEmail.trim() || undefined,
  });
  const subscriptions = subscriptionPayload?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Amount (completed)</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              ${Number(stats.totalAmount).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Count (completed)</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stats.totalCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">By Type</p>
            <div className="mt-2 space-y-1">
              {stats.byType.map((row) => (
                <p key={row.type} className="text-sm text-gray-600">
                  {row.type}: ${Number(row.amount).toLocaleString()} ({row.count})
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="">All Types</option>
              <option value="TITHE">Tithe</option>
              <option value="OFFERING">Offering</option>
              <option value="DONATION">Donation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Donations ({donations?.length || 0})</h3>
        </div>
        {isLoading ? (
          <div className="p-6 text-center">Loading donations...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurring</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donations && donations.length > 0 ? (
                  donations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${Number(donation.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          donation.status === 'completed' ? 'bg-green-100 text-green-800' :
                          donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.currency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donation.isRecurring ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No donations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recurring subscriptions (Stripe) — backend / Prisma */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recurring subscriptions (Stripe)</h3>
          <p className="text-sm text-gray-500 mt-1">
            Rows appear after checkout links a subscription to a donation (webhook or success redirect).
          </p>
        </div>
        <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subscription status</label>
            <input
              type="text"
              placeholder="e.g. active, canceled, past_due"
              value={subStatus}
              onChange={(e) => setSubStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category (display name)</label>
            <input
              type="text"
              placeholder="e.g. Tithes"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donor email</label>
            <input
              type="text"
              placeholder="Contains…"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
        </div>
        {subsLoading ? (
          <div className="p-6 text-center">Loading subscriptions…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stripe status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscription ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next period end
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub) => (
                    <tr key={sub.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${Number(sub.amount).toLocaleString()} {sub.currency.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.frequency || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.customerEmail}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono break-all max-w-[200px]">
                        {sub.stripeSubscriptionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sub.nextPaymentDate
                          ? new Date(sub.nextPaymentDate).toLocaleDateString()
                          : '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No linked subscriptions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

