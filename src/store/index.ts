import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import auth from './reducers/auth';

const store = configureStore({
  reducer: { auth },
  middleware: defaultMiddleware => defaultMiddleware(),
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
