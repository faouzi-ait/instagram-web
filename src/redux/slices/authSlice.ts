/* eslint-disable no-unused-expressions */
import { AuthState } from '@/app/utils/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.token = accessToken;
      state.isLoggedIn = true;
    },
    setLogout: (state /*action*/) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, setLogout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: any) => state.auth.token;
export const selectCurrentUser = (state: any) => state.auth.user;
export const isUserLoggedIn = (state: any) => state.auth.isLoggedIn;
