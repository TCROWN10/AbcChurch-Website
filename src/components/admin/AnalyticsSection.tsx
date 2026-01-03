"use client";
import { useState } from 'react';
import { useGetBirthdayAnalyticsQuery } from '@/store';

export default function AnalyticsSection() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const { data: analytics, isLoading } = useGetBirthdayAnalyticsQuery({ date });

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF602E]"
            />
          </div>
        </div>
      </div>

      {/* Birthday Analytics */}
      {isLoading ? (
        <div className="text-center py-8">Loading birthday analytics...</div>
      ) : analytics ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Birthday Analytics</h3>
            <p className="text-sm text-gray-600">Date: {analytics.date}</p>
            <p className="text-sm text-gray-600">Total Birthdays: {analytics.count}</p>
          </div>

          {analytics.birthdays && analytics.birthdays.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.birthdays.map((person) => (
                    <tr key={person.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {person.name} {person.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(person.dob).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No birthdays found for this date
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No analytics data available</div>
      )}
    </div>
  );
}

