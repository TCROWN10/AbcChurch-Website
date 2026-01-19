import { baseApi } from './baseApi';
import type {
  UserProfile,
  UpdateProfileRequest,
  GetAllUsersParams,
  UpdateUserRequest,
  UpdateUserDetailsRequest,
  ApiResponse,
} from '@/types/api';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get the authenticated user's profile information
     * GET /api/users/profile
     */
    getMyProfile: builder.query<UserProfile, void>({
      query: () => '/api/users/profile',
      transformResponse: (response: unknown): UserProfile => {
        // Handle wrapped response structure: { success: true, data: UserProfile }
        if (response && typeof response === 'object' && 'id' in response && 'email' in response) {
          return response as UserProfile;
        }
        const wrapped = response as ApiResponse<UserProfile>;
        return wrapped?.data || (response as UserProfile);
      },
      providesTags: ['User'],
    }),

    /**
     * Update the authenticated user's profile details
     * PUT /api/users/profile
     */
    updateMyProfile: builder.mutation<UserProfile, UpdateProfileRequest>({
      query: (body) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body,
      }),
      transformResponse: (response: unknown): UserProfile => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response && 'email' in response) {
          return response as UserProfile;
        }
        const wrapped = response as ApiResponse<UserProfile>;
        return wrapped?.data || (response as UserProfile);
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Get all users with optional filtering (Admin/Super Admin)
     * GET /api/users
     * Query params: role, isEmailVerified, limit, offset
     */
    getAllUsers: builder.query<UserProfile[], GetAllUsersParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.role) searchParams.append('role', params.role);
          if (params.isEmailVerified !== undefined) {
            searchParams.append('isEmailVerified', String(params.isEmailVerified));
          }
          if (params.limit) searchParams.append('limit', String(params.limit));
          if (params.offset) searchParams.append('offset', String(params.offset));
        }
        const queryString = searchParams.toString();
        return `/api/users${queryString ? `?${queryString}` : ''}`;
      },
      transformResponse: (response: unknown): UserProfile[] => {
        // Handle both wrapped and unwrapped responses
        if (Array.isArray(response)) {
          return response as UserProfile[];
        }
        const wrapped = response as ApiResponse<UserProfile[]>;
        return wrapped?.data || [];
      },
      providesTags: ['Users'],
    }),

    /**
     * Get a specific user by their ID (Admin/Super Admin)
     * GET /api/users/{id}
     */
    getUserById: builder.query<UserProfile, string>({
      query: (id) => `/api/users/${id}`,
      transformResponse: (response: unknown): UserProfile => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response && 'email' in response) {
          return response as UserProfile;
        }
        const wrapped = response as ApiResponse<UserProfile>;
        return wrapped?.data || (response as UserProfile);
      },
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    /**
     * Update user information (Super Admin only)
     * PUT /api/users/{id}
     */
    updateUser: builder.mutation<UserProfile, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: unknown): UserProfile => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response && 'email' in response) {
          return response as UserProfile;
        }
        const wrapped = response as ApiResponse<UserProfile>;
        return wrapped?.data || (response as UserProfile);
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        'Users',
      ],
    }),

    /**
     * Permanently delete a user (Super Admin only)
     * DELETE /api/users/{id}
     */
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        'Users',
      ],
    }),

    /**
     * Update user profile details (Super Admin only)
     * PUT /api/users/{id}/details
     */
    updateUserDetails: builder.mutation<
      UserProfile,
      { id: string; data: UpdateUserDetailsRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/users/${id}/details`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: unknown): UserProfile => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response && 'email' in response) {
          return response as UserProfile;
        }
        const wrapped = response as ApiResponse<UserProfile>;
        return wrapped?.data || (response as UserProfile);
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        'Users',
      ],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
} = usersApi;

