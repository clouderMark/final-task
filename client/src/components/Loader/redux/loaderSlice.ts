import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../../redux/store';
import {loginApi} from '../../../views/login/redux/loginApi';
import {initialState} from './initialState';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isOpen = true;
    },
    closeLoader: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(loginApi.endpoints.checkUser.matchPending, (state) => {
        state.isOpen = true;
      })
      .addMatcher(loginApi.endpoints.checkUser.matchFulfilled, (state) => {
        state.isOpen = false;
      })
      .addMatcher(loginApi.endpoints.checkUser.matchRejected, (state) => {
        state.isOpen = false;
      });
  },
});

export const selectLoader = (state: RootState) => state.loader;
export const {showLoader, closeLoader} = loaderSlice.actions;
