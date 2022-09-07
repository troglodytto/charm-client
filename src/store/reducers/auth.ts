import {
  createSlice,
  createSelector,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import type { AppState } from 'store';

interface AuthState {
  userId: string;
  userName: string;
  token: string;
  isAuthorized: boolean;
  profileImage: string;
  onlineStatus: boolean;
}

const initialState: AuthState = {
  userId: '',
  userName: '',
  token: '',
  isAuthorized: false,
  profileImage: '',
  onlineStatus: false,
};

const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>>({
  name: 'AUTH',
  initialState,
  reducers: {
    onLogin(_, action: PayloadAction<AuthState>) {
      return action.payload;
    },
    onLogout() {
      return initialState;
    },
    flipOnlineStatus() {},
  },
});

export const authSelector = createSelector(
  (state: AppState) => state,
  (state: AppState) => state.auth
);

export const { onLogin, onLogout } = authSlice.actions;

export default authSlice.reducer;
