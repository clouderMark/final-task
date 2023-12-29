import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from '../../../redux/store';
import {AlertArg} from './types';
import {initialState} from './initialState';

export const showAlert = createAsyncThunk('alert/set', (arg: AlertArg) => {
  const {timeout = 4000} = arg;

  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
});

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showAlert.pending, (state, action) => {
        const {message, statusCode} = action.meta.arg;

        state.message = message;
        state.isOpen = true;
        state.statusCode = statusCode;
      })
      .addCase(showAlert.fulfilled, () => initialState);
  },
});

export const selectAlert = (state: RootState) => state.alert;
