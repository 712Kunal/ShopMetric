import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/shared/state/redux-api/base.api.js';

export const AdminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Dashboard', 'Users'],

  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: 'admin/getDashboard',
        method: 'GET',
      }),

      providesTags: ['Dashboard'],
    }),

    createUser: builder.mutation({
      query: (userData) => ({
        url: 'admin/create-user',
        method: 'POST',
        body: userData,
      }),

      invalidatesTags: ['Users'],
    }),

    listUsers: builder.query({
      query: () => 'admin/list-users',
      providesTags: ['Users'],
    }),

    getUserDetails: builder.query({
      query: (userId) => `admin/get-user-details/${userId}`,
      providesTags: ['Users'],
    }),

    listStores: builder.query({
      query: () => 'admin/list-stores',
      providesTags: ['Stores'],
    }),

    createStore: builder.mutation({
      query: (storeData) => ({
        url: 'admin/create-store',
        method: 'POST',
        body: storeData,
      }),
      invalidatesTags: ['Stores', 'Dashboard'],
    }),
  }),
});

export const { useGetDashboardQuery } = AdminApi;
