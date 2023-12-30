import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../../redux/store';
import {initialState} from './initialState';
import {ELang} from '../../../types/types';
import {ELanguage} from './types';

export const langSlice = createSlice({
  name: 'lang',
  initialState: initialState,
  reducers: {
    changeLang: (state) => {
      state.lang = state.lang === ELang.BEL ? ELang.ENG : ELang.BEL;
      localStorage.setItem(ELanguage.IS, JSON.stringify(state.lang));
    },
  },
});

export const selectLang = (state: RootState) => state.lang;
export const {changeLang} = langSlice.actions;
