import { baseApi } from './baseApi';
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  RefreshTokenRequest,
  UserProfile,
  ApiResponse,
} from '@/types/api';

// Helper function to make fetch calls to Next.js API routes
async function fetchNextApi(url: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register a new user
    registerUser: builder.mutation<ApiResponse, RegisterRequest>({
      query: (body) => {
        console.log('registerUser mutation called with:', body);
        return {
          url: '/api/auth',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response: any, meta: any) => {
        console.log('registerUser transformResponse:', { response, status: meta?.response?.status });
        // Handle empty response (201 Created might return empty body)
        if (!response && meta?.response?.status === 201) {
          return { success: true, message: 'User registered successfully' };
        }
        return response;
      },
    }),

    // Register a new admin
    registerAdmin: builder.mutation<ApiResponse, RegisterRequest>({
      queryFn: async (arg) => {
        console.log('registerAdmin mutation called with:', arg);
        try {
          // Get token from localStorage
          const token = typeof window !== 'undefined' 
            ? localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
            : null;

          // Build headers
          const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          };

          // Add authorization token if available
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          // Use Next.js API proxy route to avoid CORS issues
          const response = await fetch('/api/auth/admin', {
            method: 'POST',
            headers,
            body: JSON.stringify(arg),
          });

          const data = await response.json();
          console.log('registerAdmin response status:', response.status);
          console.log('registerAdmin response data:', data);

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: data,
                error: data?.message || data?.data?.message || 'Failed to register admin',
              },
            };
          }

          return { data };
        } catch (error: any) {
          console.error('registerAdmin error:', error);
          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: error,
              error: error.message || 'Failed to register admin',
            },
          };
        }
      },
    }),

    // Register a new super admin
    registerSuperAdmin: builder.mutation<ApiResponse, RegisterRequest>({
      query: (body) => ({
        url: '/api/auth/super-admin',
        method: 'POST',
        body,
      }),
    }),

    // User login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store token in localStorage
          if (data.data?.accessToken && typeof window !== 'undefined') {
            localStorage.setItem('accessToken', data.data.accessToken);
          }
        } catch (error) {
          // Handle error
        }
      },
    }),

    // Verify OTP
    verifyOtp: builder.mutation<ApiResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: '/api/auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),

    // Resend OTP
    resendOtp: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: '/api/auth/resend-otp',
        method: 'POST',
      }),
    }),

    // Refresh token
    refreshToken: builder.mutation<ApiResponse, RefreshTokenRequest>({
      query: (body) => ({
        url: '/api/auth/refresh',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const response = data as { data?: { accessToken?: string } };
          if (response.data?.accessToken && typeof window !== 'undefined') {
            localStorage.setItem('accessToken', response.data.accessToken);
          }
        } catch (error) {
          // Handle error
        }
      },
    }),

    // Get user profile
    getProfile: builder.query<UserProfile, void>({
      query: () => '/api/auth/profile',
      providesTags: ['User'],
      transformResponse: (response: any) => {
        // Handle wrapped response structure: { success: true, data: UserProfile }
        if (response?.data && typeof response.data === 'object' && 'id' in response.data) {
          return response.data as UserProfile;
        }
        // If response is already the profile object, return it directly
        return response as UserProfile;
      },
    }),

    // Google OAuth - User
    googleAuth: builder.query<void, void>({
      query: () => '/api/auth/google',
    }),

    // Google OAuth - Admin
    googleAuthAdmin: builder.query<void, void>({
      query: () => '/api/auth/google/admin',
    }),

    // Google OAuth - Super Admin
    googleAuthSuperAdmin: builder.query<void, void>({
      query: () => '/api/auth/google/super-admin',
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useRegisterAdminMutation,
  useRegisterSuperAdminMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useLazyGoogleAuthQuery,
  useLazyGoogleAuthAdminQuery,
  useLazyGoogleAuthSuperAdminQuery,
} = authApi;

