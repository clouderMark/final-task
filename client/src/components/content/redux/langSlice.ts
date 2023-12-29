import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../../redux/store';
import {initialState} from './initialState';
import {ELang} from '../../../types/types';

export const langSlice = createSlice({
  name: 'lang',
  initialState: initialState,
  reducers: {
    setLang: (state, action: PayloadAction<{lang: ELang}>) => {
      state.lang = action.payload.lang;
    },
  },
});

export const selectLang = (state: RootState) => state.lang;
export const {setLang} = langSlice.actions;
