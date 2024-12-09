import axios from 'axios';
import jwtDecode from 'jsonwebtoken';
import { REHYDRATE } from 'redux-persist';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCredentials, setLogout } from '../slices/authSlice';

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode.decode(token);
    if (!decoded.exp) return true; // If no expiration claim, treat as expired

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < now; // Check if the token has expired
  } catch (error) {
    return true; // Treat invalid tokens as expired
  }
};

const baseQuery = fetchBaseQuery({
  mode: 'cors',
  credentials: 'include',
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
    if (
      action.type === REHYDRATE &&
      action.key === 'key used with redux-persist'
    ) {
      return action.payload;
    }
  },
  prepareHeaders: async (headers, { getState }) => {
    const token = getState().auth?.token?.token || '';
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  const state = api.getState();
  const token = state.auth?.token?.token || '';
  const refreshToken = state.auth?.token?.refreshToken || '';

  if (token && isTokenExpired(token)) {
    try {
      if (refreshToken) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
          { refreshToken }
        );

        if (data) {
          const { token: newToken, newRefreshToken, user } = data;
          api.dispatch(
            setCredentials({
              user,
              accessToken: { token: newToken, refreshToken: newRefreshToken },
            })
          );
        }
      } else {
        api.dispatch(setLogout());
        return { error: { status: 401, data: 'Refresh token missing' } };
      }
    } catch (error) {
      api.dispatch(setLogout());
      return { error: { status: 401, data: 'Token refresh failed' } };
    }
  }

  // Proceed with the original request
  return baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User', 'Images', 'Posts', 'Post', 'Search', 'Photo'],
  endpoints: () => ({}),
});
