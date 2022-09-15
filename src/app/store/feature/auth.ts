import {
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { googleLogin } from 'app/services/firebase';
import axios from 'axios';

interface AuthState {
  email: string;
  userName: string;
  profileImage: string;
  isAuthorized: boolean;
  isOnline: boolean;
  isLoading: boolean;
}

export const initializeAuthState = async (): Promise<AuthState> => {
  return {
    isAuthorized: false,
    isOnline: false,
    profileImage: '',
    email: '',
    userName: '',
    isLoading: false,
  };
};

const initialState: AuthState = {
  isAuthorized: false,
  isOnline: false,
  profileImage: '',
  email: '',
  userName: '',
  isLoading: false,
};

export const loginAction = createAsyncThunk<Partial<AuthState>>(
  'AUTH/LOGIN',
  async () => {
    const data = await googleLogin();
    return {
      isOnline: data.is_active,
      profileImage: data.profile_image,
      email: data.email,
      userName: data.user_name,
    };
  }
);

export const logoutAction = createAsyncThunk('AUTH/LOGOUT', async () => {
  await axios.get('/api/auth/logout');
});

export const setOnlineStatusAction = createAsyncThunk<boolean, boolean>(
  'AUTH/ONLINE_STATUS',
  status => status
);

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
    });

    builder.addCase(loginAction.rejected, state => {
      state.isAuthorized = false;
      state.isOnline = false;
      state.isLoading = false;
      state.profileImage = '';
      state.email = '';
      state.userName = '';
    });

    builder.addCase(logoutAction.fulfilled, state => {
      state.isAuthorized = false;
      state.isOnline = false;
      state.isLoading = false;
      state.profileImage = '';
      state.email = '';
      state.userName = '';
    });

    builder.addCase(setOnlineStatusAction.fulfilled, (state, { payload }) => {
      state.isOnline = payload;
    });
  },
});

export default authSlice.reducer;
