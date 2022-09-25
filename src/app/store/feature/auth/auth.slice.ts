import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { AuthState } from 'next-env';
import {
  loginAction,
  logoutAction,
  refreshAction,
  setOnlineStatusAction,
} from './auth.actions';

export const initializeAuthState = async (): Promise<AuthState> => {
  return {
    isAuthorized: false,
    isOnline: false,
    profileImage: '',
    email: '',
    userName: '',
    isLoading: false,
    token: '',
  };
};

const initialState: AuthState = {
  isAuthorized: false,
  isOnline: false,
  profileImage: '',
  email: '',
  userName: '',
  isLoading: false,
  token: '',
};

const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>>({
  name: 'AUTH',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAction.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(loginAction.fulfilled, (state, { payload }) => {
      state.isAuthorized = true;
      state.isOnline = payload.isOnline;
      state.profileImage = payload.profileImage;
      state.email = payload.email;
      state.userName = payload.userName;
      state.isLoading = false;
      state.token = payload.token;
    });

    builder.addCase(loginAction.rejected, state => {
      state.isAuthorized = false;
      state.isOnline = false;
      state.isLoading = false;
      state.profileImage = '';
      state.email = '';
      state.userName = '';
      state.token = '';
    });

    builder.addCase(refreshAction, (state, { payload }) => {
      state.token = payload;
    });

    builder.addCase(logoutAction.fulfilled, state => {
      state.isAuthorized = false;
      state.isOnline = false;
      state.isLoading = false;
      state.profileImage = '';
      state.email = '';
      state.userName = '';
      state.token = '';
    });

    builder.addCase(setOnlineStatusAction.fulfilled, (state, { payload }) => {
      state.isOnline = payload;
    });
  },
});

export default authSlice.reducer;
