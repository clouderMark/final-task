import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '../views/login/redux/userSlice/userSlice';
import {alertSlice} from '../components/AlertLine/redux/alertSlice';
import {loaderSlice} from '../components/Loader/redux/loaderSlice';
import {loginApi} from '../views/login/redux/loginApi';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    alert: alertSlice.reducer,
    loader: loaderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loginApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
