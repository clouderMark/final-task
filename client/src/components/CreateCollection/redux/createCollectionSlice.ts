import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectChangeEvent} from '@mui/material';
import type {RootState} from '../../../redux/store';
import {initialState} from './initialState';
import {EName} from './types';

export const createCollectionSlice = createSlice({
  name: 'createCollection',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<FileList | null>) => {
      const files = action.payload;

      if (files) {
        const file = files[0];

        state[EName.IMAGE].image = file;
        state[EName.IMAGE].imageUrl = URL.createObjectURL(file);
      }
    },

    setPropType: (state, action: PayloadAction<SelectChangeEvent<string[]>>) => {
      const {value} = action.payload.target;

      state[EName.PROPS] = typeof value === 'string' ? value.split(',') : value;
    },

    setName: (state, action: PayloadAction<string>) => {
      state[EName.NAME] = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state[EName.DESCRIPTION] = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state[EName.THEME] = action.payload;
    },
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state[EName.VISIBLE] = action.payload;
    },
    reset: () => initialState,
  },
});

export const selectCollection = (state: RootState) => state.createCollection;
export const {setImage, setPropType, setName, setDescription, setTheme, setVisibility, reset} =
  createCollectionSlice.actions;
