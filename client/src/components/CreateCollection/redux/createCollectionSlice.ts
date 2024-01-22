import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectChangeEvent} from '@mui/material';
import type {RootState} from '../../../redux/store';
import {initialState} from './initialState';
import {EName, IInitialState} from './types';

export const createCollectionSlice = createSlice({
  name: 'createCollection',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<{title: IInitialState[EName.TITLE]; id?: IInitialState[EName.ID]}>) => {
      state.title = action.payload.title;
      state.id = action.payload.id;
    },
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
    setData: (state, action: PayloadAction<IInitialState>) => {
      const data = action.payload;

      state[EName.NAME] = data[EName.NAME];
      state[EName.DESCRIPTION] = data[EName.DESCRIPTION];
      state[EName.THEME] = data[EName.THEME];
      state[EName.PROPS] = data[EName.PROPS];
      state[EName.IMAGE] = data[EName.IMAGE];
      state[EName.VISIBLE] = data[EName.VISIBLE];
      state[EName.TITLE] = data[EName.TITLE];
      state[EName.ID] = data[EName.ID];
    },
    reset: () => initialState,
  },
});

export const selectCollection = (state: RootState) => state.createCollection;
export const {setShow, setImage, setPropType, setName, setDescription, setTheme, setVisibility, setData, reset} =
  createCollectionSlice.actions;
