import { baseApi } from './baseApi';
import type {
  CreateCheckoutRequest,
  CreateCheckoutResponse,
  Donation,
  GetMyDonationsParams,
  GetAllDonationsParams,
  DonationStats,
  ApiResponse,
} from '@/types/api';

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Stripe checkout session
    createCheckout: builder.mutation<CreateCheckoutResponse, CreateCheckoutRequest>({
      query: (body) => ({
        url: '/api/donations/create-checkout',
        method: 'POST',
        body,
      }),
    }),

    // Get my donations
    getMyDonations: builder.query<Donation[], GetMyDonationsParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.type) searchParams.append('type', params.type);
          if (params.status) searchParams.append('status', params.status);
        }
        const queryString = searchParams.toString();
        return `/api/donations/my-donations${queryString ? `?${queryString}` : ''}`;
      },
      transformResponse: (response: unknown): Donation[] => {
        // Handle both wrapped and unwrapped responses
        if (Array.isArray(response)) {
          return response as Donation[];
        }
        const wrapped = response as ApiResponse<Donation[]>;
        return wrapped?.data || [];
      },
      providesTags: ['Donations'],
    }),

    // Get all donations (Super Admin only)
    getAllDonations: builder.query<Donation[], GetAllDonationsParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.type) searchParams.append('type', params.type);
          if (params.status) searchParams.append('status', params.status);
          if (params.startDate) searchParams.append('startDate', params.startDate);
          if (params.endDate) searchParams.append('endDate', params.endDate);
        }
        const queryString = searchParams.toString();
        return `/api/donations/all${queryString ? `?${queryString}` : ''}`;
      },
      transformResponse: (response: unknown): Donation[] => {
        // Handle both wrapped and unwrapped responses
        if (Array.isArray(response)) {
          return response as Donation[];
        }
        const wrapped = response as ApiResponse<Donation[]>;
        return wrapped?.data || [];
      },
      providesTags: ['Donations'],
    }),

    // Get donation statistics (Super Admin only)
    getDonationStats: builder.query<
      DonationStats,
      { startDate?: string; endDate?: string } | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.startDate) searchParams.append('startDate', params.startDate);
          if (params.endDate) searchParams.append('endDate', params.endDate);
        }
        const queryString = searchParams.toString();
        return `/api/donations/stats${queryString ? `?${queryString}` : ''}`;
      },
      transformResponse: (response: unknown): DonationStats => {
        // Handle both wrapped and unwrapped responses
        if (response && typeof response === 'object' && 'total' in response && 'count' in response) {
          return response as DonationStats;
        }
        const wrapped = response as ApiResponse<DonationStats>;
        return (wrapped?.data || { total: 0, count: 0, byType: {}, byStatus: {} }) as DonationStats;
      },
      providesTags: ['Donations'],
    }),

    // Donation success callback (Public)
    handleDonationSuccess: builder.query<ApiResponse<any>, { session_id: string }>({
      query: ({ session_id }) => ({
        url: `/api/donations/success?session_id=${session_id}`,
        method: 'GET',
      }),
    }),

    // Donation cancel callback (Public)
    handleDonationCancel: builder.query<ApiResponse<any>, void>({
      query: () => ({
        url: '/api/donations/cancel',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateCheckoutMutation,
  useGetMyDonationsQuery,
  useGetAllDonationsQuery,
  useGetDonationStatsQuery,
  useLazyHandleDonationSuccessQuery,
  useLazyHandleDonationCancelQuery,
} = donationsApi;

