import { baseApi } from './baseApi';
import type { BirthdayAnalyticsParams, BirthdayAnalytics } from '@/types/api';

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get birthday analytics (Admin/Super Admin)
    getBirthdayAnalytics: builder.query<BirthdayAnalytics, BirthdayAnalyticsParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.date) {
          searchParams.append('date', params.date);
        }
        const queryString = searchParams.toString();
        return `/api/analytics/birthdays${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useGetBirthdayAnalyticsQuery,
} = analyticsApi;

