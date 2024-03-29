import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '../components/LoginUser/redux/userSlice/userSlice';
import {alertSlice} from '../components/AlertLine/redux/alertSlice';
import {loaderSlice} from '../components/Loader/redux/loaderSlice';
import {loginApi} from '../components/LoginUser/redux/loginApi';
import {langSlice} from '../components/content/redux/langSlice';
import {themeSlice} from '../styles/themeSlice/themeSlice';
import {userApi} from './userApi';
import {collectionApi, collectionSlice} from './collectionApi';
import {createCollectionSlice} from '../components/CreateCollection/redux/createCollectionSlice';
import {itemApi} from './itemApi';
import {createItemSlice} from '../components/CreateItem/redux/createItemSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    alert: alertSlice.reducer,
    loader: loaderSlice.reducer,
    lang: langSlice.reducer,
    theme: themeSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    collection: collectionSlice.reducer,
    createCollection: createCollectionSlice.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    createItem: createItemSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(loginApi.middleware)
      .concat(userApi.middleware)
      .concat(collectionApi.middleware)
      .concat(itemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
