import { baseApi } from './baseApi';
import type {
  PrayerRequest,
  CreatePrayerRequestRequest,
  GetPrayerRequestsParams,
  AddNotesRequest,
} from '@/types/api';

export const prayerRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create prayer request
    createPrayerRequest: builder.mutation<PrayerRequest, CreatePrayerRequestRequest>({
      query: (body) => ({
        url: '/api/prayer-requests',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PrayerRequests'],
    }),

    // Get all prayer requests
    getPrayerRequests: builder.query<PrayerRequest[], GetPrayerRequestsParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.status) searchParams.append('status', params.status);
          if (params.public) searchParams.append('public', params.public);
          if (params.limit) searchParams.append('limit', String(params.limit));
          if (params.offset) searchParams.append('offset', String(params.offset));
        }
        const queryString = searchParams.toString();
        return `/api/prayer-requests${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['PrayerRequests'],
    }),

    // Get my prayer requests
    getMyPrayerRequests: builder.query<PrayerRequest[], void>({
      query: () => '/api/prayer-requests/my-requests',
      providesTags: ['PrayerRequests'],
    }),

    // Get prayer request by ID
    getPrayerRequest: builder.query<PrayerRequest, string>({
      query: (id) => `/api/prayer-requests/${id}`,
      providesTags: (result, error, id) => [{ type: 'PrayerRequest', id }],
    }),

    // Delete prayer request (Admin/Super Admin)
    deletePrayerRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PrayerRequests'],
    }),

    // Mark prayer request as read (Admin/Super Admin)
    markPrayerRequestAsRead: builder.mutation<PrayerRequest, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}/mark-read`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),

    // Mark prayer request as unread (Admin/Super Admin)
    markPrayerRequestAsUnread: builder.mutation<PrayerRequest, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}/mark-unread`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),

    // Add notes to prayer request (Admin/Super Admin)
    addNotesToPrayerRequest: builder.mutation<
      PrayerRequest,
      { id: string; data: AddNotesRequest }
    >({
      query: ({ id, data }) => ({
        url: `/api/prayer-requests/${id}/notes`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PrayerRequest', id },
        'PrayerRequests',
      ],
    }),

    // Archive prayer request (Admin/Super Admin)
    archivePrayerRequest: builder.mutation<PrayerRequest, string>({
      query: (id) => ({
        url: `/api/prayer-requests/${id}/archive`,
        method: 'PUT',
      }),
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

