import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../redux/store';
import {ETheme} from '../../types/types';
import {initialState} from './initialState';
import {EThemeMode} from './types';

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeColorTheme: (state) => {
      state.type = state.type === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT;
      localStorage.setItem(EThemeMode.IS, JSON.stringify(state.type));
    },
  },
});

export const selectTheme = (state: RootState) => state.theme;
export const {changeColorTheme} = themeSlice.actions;
