# RTK Query Setup for ABC Church API

This document describes the Redux Toolkit Query (RTK Query) setup for managing ABC Church API endpoints and state.

## Installation

Install the required dependencies:

```bash
npm install @reduxjs/toolkit react-redux
```

## Project Structure

```
src/
├── store/
│   ├── baseApi.ts              # Base API configuration with auth token injection
│   ├── authApi.ts              # Authentication endpoints
│   ├── usersApi.ts             # User management endpoints
│   ├── donationsApi.ts         # Donation endpoints
│   ├── messagesApi.ts          # Message endpoints
│   ├── newsletterApi.ts        # Newsletter endpoints
│   ├── prayerRequestsApi.ts    # Prayer request endpoints
│   ├── financialApi.ts         # Financial reporting endpoints
│   ├── analyticsApi.ts         # Analytics endpoints
│   ├── store.ts                # Redux store configuration
│   ├── hooks.ts                # Typed Redux hooks
│   └── index.ts                # Centralized exports
├── types/
│   └── api.ts                  # TypeScript types for API requests/responses
└── providers/
    └── redux-provider.tsx      # Redux Provider component
```

## Usage

### Basic Example

```tsx
import { useGetMessagesQuery, useCreateMessageMutation } from '@/store';

function MessagesPage() {
  const { data: messages, isLoading, error } = useGetMessagesQuery({ published: 'true' });
  const [createMessage, { isLoading: isCreating }] = useCreateMessageMutation();

  const handleCreate = async () => {
    try {
      await createMessage({
        title: 'Sunday Service',
        content: 'Message content...',
        type: 'SUNDAY',
      }).unwrap();
      // Success!
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading messages</div>;

  return (
    <div>
      {messages?.map((message) => (
        <div key={message.id}>{message.title}</div>
      ))}
      <button onClick={handleCreate} disabled={isCreating}>
        Create Message
      </button>
    </div>
  );
}
```

### Authentication

The API automatically injects the JWT token from localStorage. After login:

```tsx
import { useLoginMutation } from '@/store';

function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({ email, password }).unwrap();
      // Token is automatically stored in localStorage
      // Redirect to dashboard
    } catch (error) {
      // Handle error
    }
  };
}
```

### Available Hooks

#### Authentication (`authApi`)
- `useRegisterUserMutation` - Register new user
- `useRegisterAdminMutation` - Register admin
- `useRegisterSuperAdminMutation` - Register super admin
- `useLoginMutation` - User login
- `useVerifyOtpMutation` - Verify OTP code
- `useResendOtpMutation` - Resend OTP
- `useRefreshTokenMutation` - Refresh access token
- `useGetProfileQuery` - Get user profile
- `useLazyGoogleAuthQuery` - Google OAuth (User)
- `useLazyGoogleAuthAdminQuery` - Google OAuth (Admin)
- `useLazyGoogleAuthSuperAdminQuery` - Google OAuth (Super Admin)

#### Users (`usersApi`)
- `useGetMyProfileQuery` - Get my profile
- `useUpdateMyProfileMutation` - Update my profile
- `useGetAllUsersQuery` - Get all users (Admin/Super Admin)
- `useGetUserByIdQuery` - Get user by ID
- `useUpdateUserMutation` - Update user (Super Admin)
- `useDeleteUserMutation` - Delete user (Super Admin)
- `useUpdateUserDetailsMutation` - Update user details (Super Admin)

#### Donations (`donationsApi`)
- `useCreateCheckoutMutation` - Create Stripe checkout session
- `useGetMyDonationsQuery` - Get my donations
- `useGetAllDonationsQuery` - Get all donations (Super Admin)
- `useGetDonationStatsQuery` - Get donation statistics (Super Admin)
- `useLazyHandleDonationSuccessQuery` - Handle donation success
- `useLazyHandleDonationCancelQuery` - Handle donation cancel

#### Messages (`messagesApi`)
- `useGetMessagesQuery` - Get all messages
- `useCreateMessageMutation` - Create message (Admin/Super Admin)
- `useGetMessageQuery` - Get message by ID
- `useUpdateMessageMutation` - Update message (Admin/Super Admin)
- `useDeleteMessageMutation` - Delete message (Admin/Super Admin)
- `usePublishMessageMutation` - Publish message (Admin/Super Admin)

#### Newsletter (`newsletterApi`)
- `useSubscribeMutation` - Subscribe (Authenticated)
- `useSubscribeByEmailMutation` - Subscribe by email (Public)
- `useUnsubscribeByEmailMutation` - Unsubscribe by email (Public)
- `useUnsubscribeMutation` - Unsubscribe (Authenticated)
- `useGetMySubscriptionQuery` - Get my subscription

#### Prayer Requests (`prayerRequestsApi`)
- `useCreatePrayerRequestMutation` - Create prayer request
- `useGetPrayerRequestsQuery` - Get all prayer requests
- `useGetMyPrayerRequestsQuery` - Get my prayer requests
- `useGetPrayerRequestQuery` - Get prayer request by ID
- `useDeletePrayerRequestMutation` - Delete prayer request (Admin/Super Admin)
- `useMarkPrayerRequestAsReadMutation` - Mark as read (Admin/Super Admin)
- `useMarkPrayerRequestAsUnreadMutation` - Mark as unread (Admin/Super Admin)
- `useAddNotesToPrayerRequestMutation` - Add notes (Admin/Super Admin)
- `useArchivePrayerRequestMutation` - Archive prayer request (Admin/Super Admin)

#### Financial (`financialApi`)
- `useGetFinancialSummaryQuery` - Get financial summary (Super Admin)
- `useLazyExportExcelQuery` - Export to Excel (Super Admin)
- `useExportExcelToEmailMutation` - Export and email Excel (Super Admin)
- `useLazyExportPDFQuery` - Export to PDF (Super Admin)
- `useExportPDFToEmailMutation` - Export and email PDF (Super Admin)

#### Analytics (`analyticsApi`)
- `useGetBirthdayAnalyticsQuery` - Get birthday analytics (Admin/Super Admin)

## Configuration

### Base URL

The API base URL is configured in `src/store/baseApi.ts`. It defaults to:
- Production: `https://abcchurch-backend-production.up.railway.app`
- You can override with `NEXT_PUBLIC_API_URL` environment variable

### Token Storage

Tokens are stored in `localStorage`:
- `accessToken` - JWT access token
- `refreshToken` - Refresh token (if available)

The base API automatically injects the token in the `Authorization` header for authenticated requests.

### Token Refresh

The base API includes automatic token refresh logic. When a 401 error is received, it will:
1. Attempt to refresh the token using the refresh token
2. Retry the original request with the new token
3. Clear tokens if refresh fails

## TypeScript Support

All API endpoints are fully typed. Import types from `@/types/api`:

```tsx
import type { Message, CreateMessageRequest, Donation } from '@/types/api';
```

## Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://abcchurch-backend-production.up.railway.app
```

## Notes

- All mutations return promises that can be unwrapped with `.unwrap()`
- Queries support automatic refetching and caching
- Tags are used for cache invalidation
- The store is already integrated into the app layout via `ReduxProvider`

