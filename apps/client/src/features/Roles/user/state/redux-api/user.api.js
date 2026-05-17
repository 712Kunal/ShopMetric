import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/shared/state/redux-api/base.api.js';

export const ownerApi = createApi({
  reducerPath: 'ownerApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Stores', 'Ratings'],

  endpoints: (builder) => ({
    // 🏬 LIST STORES (with filters)
    listStores: builder.query({
      query: ({
        name = '',
        address = '',
        sortBy = 'name',
        order = 'asc',
      } = {}) => ({
        url: '/api/stores/list-stores',
        method: 'GET',
        params: { name, address, sortBy, order },
      }),
      providesTags: ['Stores'],
    }),

    // 🏬 GET STORE BY ID
    getStoreById: builder.query({
      query: (storeId) => `/api/stores/get-store/${storeId}`,
      providesTags: ['Stores'],
    }),

    // ⭐ ADD RATING
    addRating: builder.mutation({
      query: (ratingData) => ({
        url: '/api/ratings/submit-rating',
        method: 'POST',
        body: ratingData,
      }),
      invalidatesTags: ['Ratings', 'Stores'],
    }),

    // ✏️ UPDATE RATING
    updateRating: builder.mutation({
      query: ({ ratingId, value }) => ({
        url: `/api/ratings/update-rating/${ratingId}`,
        method: 'PUT',
        body: { value },
      }),
      invalidatesTags: ['Ratings', 'Stores'],
    }),
  }),
});

export const { useListStoresQuery, useGetStoreByIdQuery } = ownerApi;
