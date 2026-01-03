import { baseApi } from './baseApi';
import type {
  SubscribeRequest,
  SubscribeByEmailRequest,
  UnsubscribeByEmailRequest,
  NewsletterSubscription,
  ApiResponse,
} from '@/types/api';

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Subscribe to newsletter (Authenticated)
    subscribe: builder.mutation<ApiResponse, SubscribeRequest | void>({
      query: (body) => ({
        url: '/api/newsletter/subscribe',
        method: 'POST',
        body: body || {},
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Subscribe by email (Public)
    subscribeByEmail: builder.mutation<ApiResponse, SubscribeByEmailRequest>({
      query: (body) => ({
        url: '/api/newsletter/subscribe-email',
        method: 'POST',
        body,
      }),
    }),

    // Unsubscribe by email (Public)
    unsubscribeByEmail: builder.mutation<ApiResponse, UnsubscribeByEmailRequest>({
      query: (body) => ({
        url: '/api/newsletter/unsubscribe-email',
        method: 'POST',
        body,
      }),
    }),

    // Unsubscribe from newsletter (Authenticated)
    unsubscribe: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: '/api/newsletter/unsubscribe',
        method: 'POST',
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Get my subscription
    getMySubscription: builder.query<NewsletterSubscription, void>({
      query: () => '/api/newsletter/my-subscription',
      providesTags: ['Newsletter'],
    }),
  }),
});

export const {
  useSubscribeMutation,
  useSubscribeByEmailMutation,
  useUnsubscribeByEmailMutation,
  useUnsubscribeMutation,
  useGetMySubscriptionQuery,
} = newsletterApi;

