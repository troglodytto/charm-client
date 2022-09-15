import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
  AnyAction,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import auth from 'app/store/feature/auth';

const rootReducer = combineReducers({ auth });

const hydratingRootReducer = (
  state: ReturnType<typeof rootReducer>,
  action: AnyAction
): ReturnType<typeof rootReducer> => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return rootReducer(state, action);
};

const store = configureStore({
  reducer: hydratingRootReducer,
  middleware: defaultMiddleware => defaultMiddleware(),
});

const createStore = () => store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const wrapper = createWrapper(createStore, { debug: true });

export default wrapper;
