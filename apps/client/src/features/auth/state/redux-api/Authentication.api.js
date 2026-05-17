import { createApi } from '@reduxjs/toolkit/query/react';
import {
  baseQueryWithReauth,
  baseQuery,
} from '@/shared/state/redux-api/base.api.js';

export const AuthenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery,
  tagTypes: ['Authentication'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Authentication'],
    }),

    login: builder.mutation({
      query: (user) => {
        return {
          url: 'auth/login',
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['Authentication'],
    }),

    logout: builder.mutation({
      async queryFn(arg, api, extraOptions) {
        return baseQueryWithReauth(
          {
            url: 'auth/logout',
            method: 'POST',
          },
          api,
          extraOptions
        );
      },
    }),

    resetPassword: builder.mutation({
      async queryFn(args, api, extraOptions, baseQuery) {
        const result = await baseQueryWithReauth(
          {
            url: 'auth/updatePassword',
            method: 'POST',
            body: args,
          },
          api,
          extraOptions
        );

        return result;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = AuthenticationApi;
