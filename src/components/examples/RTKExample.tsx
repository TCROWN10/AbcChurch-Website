/**
 * Example component demonstrating RTK Query usage
 * This file shows how to use the RTK Query hooks in your components
 */

'use client';

import {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useGetPrayerRequestsQuery,
  useCreatePrayerRequestMutation,
  useGetMyDonationsQuery,
} from '@/store';

export function MessagesExample() {
  // Query hook - automatically fetches and caches data
  const { data: messages, isLoading, error, refetch } = useGetMessagesQuery({
    published: 'true',
    limit: 10,
  });

  // Mutation hook - for creating/updating/deleting
  const [createMessage, { isLoading: isCreating }] = useCreateMessageMutation();

  const handleCreate = async () => {
    try {
      const result = await createMessage({
        title: 'Sunday Service',
        content: 'Message content...',
        type: 'SUNDAY',
        videoUrl: 'https://example.com/video',
      }).unwrap();
      console.log('Message created:', result);
      // Cache is automatically invalidated, so the list will refresh
    } catch (error) {
      console.error('Failed to create message:', error);
    }
  };

  if (isLoading) return <div>Loading messages...</div>;
  if (error) return <div>Error loading messages</div>;

  return (
    <div>
      <h2>Messages</h2>
      <button onClick={handleCreate} disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create Message'}
      </button>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {messages?.map((message) => (
          <li key={message.id}>
            <h3>{message.title}</h3>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PrayerRequestsExample() {
  const { data: requests, isLoading } = useGetPrayerRequestsQuery({
    public: 'true',
    limit: 20,
  });
  const [createRequest, { isLoading: isCreating }] = useCreatePrayerRequestMutation();

  const handleSubmit = async () => {
    try {
      await createRequest({
        requesterName: 'John Doe',
        requesterEmail: 'john@example.com',
        title: 'Prayer for healing',
        content: 'Please pray for...',
        isPublic: true,
      }).unwrap();
    } catch (error) {
      console.error('Failed to create prayer request:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Prayer Requests</h2>
      <button onClick={handleSubmit} disabled={isCreating}>
        Submit Request
      </button>
      {requests?.map((request) => (
        <div key={request.id}>
          <h3>{request.title}</h3>
          <p>{request.content}</p>
        </div>
      ))}
    </div>
  );
}

export function DonationsExample() {
  // Get user's donations with filtering
  const { data: donations, isLoading } = useGetMyDonationsQuery({
    type: 'TITHE',
    status: 'completed',
  });

  if (isLoading) return <div>Loading donations...</div>;

  return (
    <div>
      <h2>My Donations</h2>
      <p>Total: {donations?.length || 0}</p>
      {donations?.map((donation) => (
        <div key={donation.id}>
          <p>
            {donation.type}: ${donation.amount} {donation.currency}
          </p>
          <p>Status: {donation.status}</p>
        </div>
      ))}
    </div>
  );
}

