import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { authApi } from './authApi';
import { usersApi } from './usersApi';
import { donationsApi } from './donationsApi';
import { messagesApi } from './messagesApi';
import { newsletterApi } from './newsletterApi';
import { prayerRequestsApi } from './prayerRequestsApi';
import { financialApi } from './financialApi';
import { analyticsApi } from './analyticsApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['api/executeQuery/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

