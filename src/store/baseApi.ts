import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Base URL - Use Next.js API routes as proxy to avoid CORS issues
// In development, we proxy through Next.js API routes which then call the backend
const BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin // Use Next.js API proxy routes
  : (process.env.NEXT_PUBLIC_API_URL || 'https://abcchurch-backend-production.up.railway.app');

// Custom base query with token injection
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    // Get token from localStorage or session storage
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

// List of Next.js API routes that should NOT go through proxy
const NEXTJS_API_ROUTES = [
  '/api/auth/login',
  '/api/auth',
  '/api/auth/admin',
  '/api/auth/super-admin',
  '/api/auth/verify-otp',
  '/api/auth/resend-otp',
  '/api/auth/refresh',
  '/api/auth/profile',
  '/api/auth/google',
  '/api/auth/google/admin',
  '/api/auth/google/super-admin',
  '/api/donations/create-checkout',
  '/api/subscriptions',
  '/api/test-email',
  '/api/notifications',
  '/api/admin',
];

// Base query with re-authentication logic
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Determine the URL
  const url = typeof args === 'string' ? args : args.url;
  
  // Check if this is a Next.js API route or a backend API route
  const isNextJsRoute = NEXTJS_API_ROUTES.some(route => url.startsWith(route));
  
  // Route backend API calls through proxy to avoid CORS
  // Next.js API routes are used directly
  const finalUrl = isNextJsRoute 
    ? url 
    : `/api/proxy${url.startsWith('/') ? url : `/${url}`}`;
  
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('RTK Query: Making request to:', finalUrl, isNextJsRoute ? '(Next.js route)' : '(proxied)');
  }
  
  const queryArgs = typeof args === 'string' 
    ? finalUrl 
    : { ...args, url: finalUrl };
  
  let result = await baseQuery(queryArgs, api, extraOptions);
  
  // Log the result for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    if (result.error) {
      const errorInfo: {
        status?: number | string;
        data?: unknown;
      } = {};
      
      if ('status' in result.error) {
        errorInfo.status = result.error.status;
      }
      if ('data' in result.error) {
        errorInfo.data = result.error.data;
      }
      
      console.error('RTK Query Error:', errorInfo);
    } else if (result.data) {
      console.log('RTK Query Success');
    }
  }
  
  if (result.error && 'status' in result.error && result.error.status === 401) {
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

