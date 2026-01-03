import { baseApi } from './baseApi';
import type {
  Message,
  GetMessagesParams,
  CreateMessageRequest,
  UpdateMessageRequest,
} from '@/types/api';

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all messages
    getMessages: builder.query<Message[], GetMessagesParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.type) searchParams.append('type', params.type);
          if (params.published) searchParams.append('published', params.published);
          if (params.limit) searchParams.append('limit', String(params.limit));
          if (params.offset) searchParams.append('offset', String(params.offset));
        }
        const queryString = searchParams.toString();
        return `/api/messages${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Messages'],
    }),

    // Create message (Admin/Super Admin)
    createMessage: builder.mutation<Message, CreateMessageRequest>({
      query: (body) => ({
        url: '/api/messages',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Messages'],
    }),

    // Get message by ID
    getMessage: builder.query<Message, string>({
      query: (id) => `/api/messages/${id}`,
      providesTags: (result, error, id) => [{ type: 'Message', id }],
    }),

    // Update message (Admin/Super Admin)
    updateMessage: builder.mutation<Message, { id: string; data: UpdateMessageRequest }>({
      query: ({ id, data }) => ({
        url: `/api/messages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Message', id },
        'Messages',
      ],
    }),

    // Delete message (Admin/Super Admin)
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),

    // Publish message (Admin/Super Admin)
    publishMessage: builder.mutation<Message, string>({
      query: (id) => ({
        url: `/api/messages/${id}/publish`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Message', id },
        'Messages',
      ],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useGetMessageQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  usePublishMessageMutation,
} = messagesApi;

