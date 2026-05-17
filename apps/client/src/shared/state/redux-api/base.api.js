import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import {
  selectAccessToken,
  setUpdateTokens,
  clearCredentials,
} from '@/features/auth/state/slices/userSlice';
import { ENVS } from '@/shared/constants/env.constant.js';

export const BASE_URL = ENVS.SERVER_BASE;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = selectAccessToken(getState());

    if (token && endpoint !== 'refreshToken') {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (
      !headers.has('Content-Type') &&
      headers.get('Content-Type') !== 'multipart/form-data'
    ) {
      headers.set('Content-Type', 'application/json');
    }
    return headers;
  },
});

// AUTO REAUTH
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status !== 403) {
    return result;
  }

  const refreshResult = await baseQuery(
    {
      url: 'auth/refreshAccessToken',
      method: 'POST',
      headers: {
        Authorization: undefined,
      },
    },
    api,
    extraOptions
  );

  const newToken = refreshResult?.meta?.response?.headers
    .get('authorization')
    ?.replace('Bearer ', '');

  if (refreshResult?.data && newToken) {
    api.dispatch(setUpdateTokens({ accessToken: newToken }));
    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(clearCredentials());
  }

  return result;
};

export { baseQueryWithReauth, baseQuery };
