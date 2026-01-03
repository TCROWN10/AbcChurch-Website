import { baseApi } from './baseApi';
import type {
  UserProfile,
  UpdateProfileRequest,
  GetAllUsersParams,
  UpdateUserRequest,
  UpdateUserDetailsRequest,
} from '@/types/api';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get my profile
    getMyProfile: builder.query<UserProfile, void>({
      query: () => '/api/users/profile',
      providesTags: ['User'],
    }),

    // Update my profile
    updateMyProfile: builder.mutation<UserProfile, UpdateProfileRequest>({
      query: (body) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    // Get all users (Admin/Super Admin)
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
      providesTags: ['Users'],
    }),

    // Get user by ID (Admin/Super Admin)
    getUserById: builder.query<UserProfile, string>({
      query: (id) => `/api/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // Update user (Super Admin only)
    updateUser: builder.mutation<UserProfile, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        'Users',
      ],
    }),

    // Delete user (Super Admin only)
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    // Update user details (Super Admin only)
    updateUserDetails: builder.mutation<
      UserProfile,
      { id: string; data: UpdateUserDetailsRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/users/${id}/details`,
        method: 'PUT',
        body: data,
      }),
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

