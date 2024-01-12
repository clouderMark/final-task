import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../redux/store';

export enum EType {
  title = 'title',
  id = 'id',

  reset = 'reset',
}

interface IInitialState {
  [EType.title]: string;
  [EType.id]: number | undefined;
}

const initialState: IInitialState = {
  [EType.title]: '',
  [EType.id]: undefined,
};

export const dialogWithTitleSlice = createSlice({
  name: 'dialogWithTitle',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<{title: IInitialState[EType.title]; id?: IInitialState[EType.id]}>) => {
      state[EType.title] = action.payload.title;
      state[EType.id] = action.payload.id;
    },

    reset: () => initialState,
  },
});

export const selectDialogWithTitle = (state: RootState) => state.dialogWithTitle;

export const {setShow, reset} = dialogWithTitleSlice.actions;
