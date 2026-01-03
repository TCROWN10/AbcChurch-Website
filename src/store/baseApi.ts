import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Base URL from Swagger documentation
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app';

// Custom base query with token injection
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    // Get token from localStorage or session storage
    // You can customize this based on your auth implementation
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
    headers.set('Content-Type', 'application/json');
    headers.set('accept', 'application/json');
    return headers;
  },
});

// Base query with re-authentication logic
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log('RTK Query: Making request to:', typeof args === 'string' ? args : args.url);
  let result = await baseQuery(args, api, extraOptions);
  
  // Log the result for debugging
  if (result.error) {
    console.error('RTK Query Error:', {
      status: result.error.status,
      data: result.error.data,
      error: result.error,
    });
  } else {
    console.log('RTK Query Success:', {
      status: 'success',
      data: result.data,
    });
  }
  
  if (result.error && result.error.status === 401) {
    // Token expired or invalid, try to refresh
    // You can implement refresh token logic here
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
      : null;
    
    if (refreshToken) {
      // Try to refresh the token
      const refreshResult = await baseQuery(
        {
          url: '/api/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );
      
      if (refreshResult.data) {
        // Store new token
        const data = refreshResult.data as { data?: { accessToken?: string } };
        if (data.data?.accessToken && typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.data.accessToken);
        }
        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, clear tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
        }
      }
    }
  }
  
  return result;
};

// Create base API slice
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Users',
    'Donation',
    'Donations',
    'Message',
    'Messages',
    'Newsletter',
    'PrayerRequest',
    'PrayerRequests',
    'Financial',
    'Analytics',
  ],
  endpoints: () => ({}),
});

