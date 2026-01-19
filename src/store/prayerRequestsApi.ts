import { baseApi } from './baseApi';
import type {
  PrayerRequest,
  CreatePrayerRequestRequest,
  GetPrayerRequestsParams,
  AddNotesRequest,
  ApiResponse,
} from '@/types/api';

export const prayerRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Create a new prayer request (authenticated user)
     * POST /api/prayer-requests
     */
    createPrayerRequest: builder.mutation<PrayerRequest, CreatePrayerRequestRequest>({
      query: (body) => ({
        url: '/api/prayer-requests',
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown): PrayerRequest => {
        // Handle wrapped response structure: { success: true, data: PrayerRequest }
        if (response && typeof response === 'object' && 'id' in response) {
          return response as PrayerRequest;
        }
        const wrapped = response as ApiResponse<PrayerRequest>;
        return wrapped?.data || (response as PrayerRequest);
      },
      invalidatesTags: ['PrayerRequests'],
    }),

    /**
     * Get all prayer requests with optional filtering
     * GET /api/prayer-requests
     * Query params: status, public, limit, offset
     */
    getPrayerRequests: builder.query<PrayerRequest[], GetPrayerRequestsParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.status) searchParams.append('status', params.status);
          if (params.public !== undefined) searchParams.append('public', String(params.public));
          if (params.limit) searchParams.append('limit', String(params.limit));
          if (params.offset) searchParams.append('offset', String(params.offset));
        }
        const queryString = searchParams.toString();
        return `/api/prayer-requests${queryString ? `?${queryString}` : ''}`;
      },
      transformResponse: (response: unknown): PrayerRequest[] => {
        // Handle both wrapped and unwrapped responses
        if (Array.isArray(response)) {
          return response as PrayerRequest[];
        }
        const wrapped = response as ApiResponse<PrayerRequest[]>;
        return wrapped?.data || [];
      },
      providesTags: ['PrayerRequests'],
    }),

    /**
     * Get all prayer requests submitted by the authenticated user
     * GET /api/prayer-requests/my-requests
     */
    getMyPrayerRequests: builder.query<PrayerRequest[], void>({
      query: () => '/api/prayer-requests/my-requests',
      transformResponse: (response: unknown): PrayerRequest[] => {
        // Handle both wrapped and unwrapped responses
        if (Array.isArray(response)) {
          return response as PrayerRequest[];
        }
        const wrapped = response as ApiResponse<PrayerRequest[]>;
        return wrapped?.data || [];
      },
      providesTags: ['PrayerRequests'],
    }),

    /**
     * Get a specific prayer request by its ID
     * GET /api/prayer-requests/{id}
     */
    getPrayerRequest: builder.query<PrayerRequest, string>({
      query: (id) => `/api/prayer-requests/${id}`,
      transformResponse: (response: unknown): PrayerRequest => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response) {
          return response as PrayerRequest;
        }
        const wrapped = response as ApiResponse<PrayerRequest>;
        return wrapped?.data || (response as PrayerRequest);
      },
      providesTags: (result, error, id) => [{ type: 'PrayerRequest', id }],
    }),

    /**
     * Delete a prayer request permanently (Admin/Super Admin)
     * DELETE /api/prayer-requests/{id}
     */
    deletePrayerRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),

    /**
     * Mark a prayer request as read by the admin (Admin/Super Admin)
     * PUT /api/prayer-requests/{id}/mark-read
     */
    markPrayerRequestAsRead: builder.mutation<PrayerRequest, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}/mark-read`,
        method: 'PUT',
      }),
      transformResponse: (response: unknown): PrayerRequest => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response) {
          return response as PrayerRequest;
        }
        const wrapped = response as ApiResponse<PrayerRequest>;
        return wrapped?.data || (response as PrayerRequest);
      },
      invalidatesTags: (result, error, id) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),

    /**
     * Mark a prayer request as unread (Admin/Super Admin)
     * PUT /api/prayer-requests/{id}/mark-unread
     */
    markPrayerRequestAsUnread: builder.mutation<PrayerRequest, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}/mark-unread`,
        method: 'PUT',
      }),
      transformResponse: (response: unknown): PrayerRequest => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response) {
          return response as PrayerRequest;
        }
        const wrapped = response as ApiResponse<PrayerRequest>;
        return wrapped?.data || (response as PrayerRequest);
      },
      invalidatesTags: (result, error, id) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),

    /**
     * Add admin notes to a prayer request (Admin/Super Admin)
     * PUT /api/prayer-requests/{id}/notes
     */
    addNotesToPrayerRequest: builder.mutation<
      PrayerRequest,
      { id: string; data: AddNotesRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/prayer-requests/${id}/notes`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: unknown): PrayerRequest => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response) {
          return response as PrayerRequest;
        }
        const wrapped = response as ApiResponse<PrayerRequest>;
        return wrapped?.data || (response as PrayerRequest);
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),

    /**
     * Archive a prayer request (Admin/Super Admin)
     * PUT /api/prayer-requests/{id}/archive
     */
    archivePrayerRequest: builder.mutation<PrayerRequest, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}/archive`,
        method: 'PUT',
      }),
      transformResponse: (response: unknown): PrayerRequest => {
        // Handle wrapped response structure
        if (response && typeof response === 'object' && 'id' in response) {
          return response as PrayerRequest;
        }
        const wrapped = response as ApiResponse<PrayerRequest>;
        return wrapped?.data || (response as PrayerRequest);
      },
      invalidatesTags: (result, error, id) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),
  }),
});

export const {
  useCreatePrayerRequestMutation,
  useGetPrayerRequestsQuery,
  useGetMyPrayerRequestsQuery,
  useGetPrayerRequestQuery,
  useDeletePrayerRequestMutation,
  useMarkPrayerRequestAsReadMutation,
  useMarkPrayerRequestAsUnreadMutation,
  useAddNotesToPrayerRequestMutation,
  useArchivePrayerRequestMutation,
} = prayerRequestsApi;

