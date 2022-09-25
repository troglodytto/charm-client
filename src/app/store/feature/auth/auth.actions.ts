import {
  createAction,
  createAsyncThunk,
  PrepareAction,
} from '@reduxjs/toolkit';
import { googleLogin } from 'app/services/firebase';
import httpClient from 'app/services/http';
import { AuthState } from 'next-env';

export const loginAction = createAsyncThunk<Partial<AuthState>>(
  'AUTH/LOGIN',
  async () => {
    const data = await googleLogin();
    return {
      isOnline: data.is_active,
      profileImage: data.profile_image,
      email: data.email,
      userName: data.user_name,
      token: data.access_token,
    };
  }
);

export const refreshAction = createAction<PrepareAction<string>, string>(
  'AUTH/REFRESH',
  token => ({ payload: token })
);

export const logoutAction = createAsyncThunk('AUTH/LOGOUT', async () => {
  await httpClient.get('/api/auth/logout');
});

export const setOnlineStatusAction = createAsyncThunk<boolean, boolean>(
  'AUTH/ONLINE_STATUS',
  status => status
);
