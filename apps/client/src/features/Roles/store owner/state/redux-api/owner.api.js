import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/shared/state/redux-api/base.api.js';

export const ownerApi = createApi({
  reducerPath: 'ownerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Dashboard'],

  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: 'storeOwner/getDashboard',
        method: 'GET',
      }),

      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardQuery } = ownerApi;
