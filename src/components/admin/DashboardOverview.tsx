"use client";
import { useGetDonationStatsQuery, useGetPrayerRequestsQuery, useGetAllUsersQuery, useGetMessagesQuery } from '@/store';

export default function DashboardOverview() {
  const { data: donationStats, isLoading: statsLoading } = useGetDonationStatsQuery();
  const { data: prayerRequests, isLoading: prayerLoading } = useGetPrayerRequestsQuery({ limit: 10 });
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery({ limit: 10 });
  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery({ limit: 10 });

  const stats = [
    {
      name: 'Total Donations',
      value: donationStats ? `$${donationStats.total.toLocaleString()}` : '$0',
      change: '+12%',
      icon: '💰',
      color: 'bg-green-500',
    },
    {
      name: 'Donation Count',
      value: donationStats?.count || 0,
      change: '+8%',
      icon: '📊',
      color: 'bg-blue-500',
    },
    {
      name: 'Prayer Requests',
      value: prayerRequests?.length || 0,
      change: '+5%',
      icon: '🙏',
      color: 'bg-purple-500',
    },
    {
      name: 'Total Users',
      value: users?.length || 0,
      change: '+15%',
      icon: '👥',
      color: 'bg-orange-500',
    },
    {
      name: 'Messages',
      value: messages?.length || 0,
      change: '+3%',
      icon: '📝',
      color: 'bg-pink-500',
    },
    {
      name: 'Pending Requests',
      value: prayerRequests?.filter((p) => p.status === 'PENDING').length || 0,
      change: '-2%',
      icon: '⏳',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`${stat.color} rounded-full p-3`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prayer Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Prayer Requests</h3>
          </div>
          <div className="p-6">
            {prayerLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : prayerRequests && prayerRequests.length > 0 ? (
              <div className="space-y-4">
                {prayerRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{request.requesterName}</p>
                      <p className="text-sm text-gray-500">{request.title}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      request.status === 'READ' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'ARCHIVED' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">No prayer requests</p>
            )}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Donations</h3>
          </div>
          <div className="p-6">
            {statsLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : donationStats ? (
              <div className="space-y-4">
                {Object.entries(donationStats.byType).map(([type, amount]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{type}</span>
                    <span className="text-sm text-gray-600">${Number(amount).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">No donation data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

