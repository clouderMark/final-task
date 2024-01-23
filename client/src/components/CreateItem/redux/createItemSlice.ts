import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import type {RootState} from '../../../redux/store';
import {initialState} from './initialState';
import {EName, IInitialState} from './types';
import {EItemTypeProp} from '../../../types/types';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
}

export const createItemSlice = createSlice({
  name: 'createItem',
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

    setName: (state, action: PayloadAction<string>) => {
      state[EName.NAME] = action.payload;
    },

    appendStr: (state) => {
      if (state[EItemTypeProp.STR].length < 3) {
        state[EItemTypeProp.STR].push({id: null, value: '', unique: uuid(), key: ''});
      }
    },
    removeStr: (state, action: PayloadAction<string>) => {
      state[EItemTypeProp.STR] = state[EItemTypeProp.STR].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeValueStr: (state, action: PayloadAction<{value: string, unique: string}>) => {
      state[EItemTypeProp.STR] = state[EItemTypeProp.STR].map((item) => (item.unique === action.payload.unique
        ?
        {...item, value: action.payload.value}
        :
        item));
    },
    // prettier-ignore
    changeKeyStr: (state, action: PayloadAction<{key: string, unique: string}>) => {
      state[EItemTypeProp.STR] = state[EItemTypeProp.STR].map((item) => (item.unique === action.payload.unique
        ?
        {...item, key: action.payload.key}
        :
        item));
    },

    appendBool: (state) => {
      if (state[EItemTypeProp.BOOL].length < 3) {
        state[EItemTypeProp.BOOL].push({id: null, value: true, unique: uuid(), key: ''});
      }
    },
    removeBool: (state, action: PayloadAction<string>) => {
      state[EItemTypeProp.BOOL] = state[EItemTypeProp.BOOL].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeValueBool: (state, action: PayloadAction<{value: boolean, unique: string}>) => {
      state[EItemTypeProp.BOOL] = state[EItemTypeProp.BOOL].map((item) => (item.unique === action.payload.unique
        ?
        {...item, value: action.payload.value}
        :
        item));
    },
    // prettier-ignore
    changeKeyBool: (state, action: PayloadAction<{key: string, unique: string}>) => {
      state[EItemTypeProp.BOOL] = state[EItemTypeProp.BOOL].map((item) => (item.unique === action.payload.unique
        ?
        {...item, key: action.payload.key}
        :
        item));
    },

    appendInt: (state) => {
      if (state[EItemTypeProp.INT].length < 3) {
        state[EItemTypeProp.INT].push({id: null, value: 0, key: '', unique: uuid()});
      }
    },
    removeInt: (state, action: PayloadAction<string>) => {
      state[EItemTypeProp.INT] = state[EItemTypeProp.INT].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeValueInt: (state, action: PayloadAction<{value: number, unique: string}>) => {
      state[EItemTypeProp.INT] = state[EItemTypeProp.INT].map((item) => (item.unique === action.payload.unique
        ?
        {...item, value: action.payload.value}
        :
        item));
    },
    // prettier-ignore
    changeKeyInt: (state, action: PayloadAction<{key: string, unique: string}>) => {
      state[EItemTypeProp.INT] = state[EItemTypeProp.INT].map((item) => (item.unique === action.payload.unique
        ?
        {...item, key: action.payload.key}
        :
        item));
    },

    appendText: (state) => {
      if (state[EItemTypeProp.TEXT].length < 3) {
        state[EItemTypeProp.TEXT].push({id: null, value: '', key: '', unique: uuid()});
      }
    },
    removeText: (state, action: PayloadAction<string>) => {
      state[EItemTypeProp.TEXT] = state[EItemTypeProp.TEXT].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeValueText: (state, action: PayloadAction<{value: string, unique: string}>) => {
      state[EItemTypeProp.TEXT] = state[EItemTypeProp.TEXT].map((item) => (item.unique === action.payload.unique
        ?
        {...item, value: action.payload.value}
        :
        item));
    },
    // prettier-ignore
    changeKeyText: (state, action: PayloadAction<{key: string, unique: string}>) => {
      state[EItemTypeProp.TEXT] = state[EItemTypeProp.TEXT].map((item) => (item.unique === action.payload.unique
        ?
        {...item, key: action.payload.key}
        :
        item));
    },

    appendDate: (state) => {
      if (state[EItemTypeProp.DATE].length < 3) {
        state[EItemTypeProp.DATE].push({id: null, value: formatDate(new Date()), key: '', unique: uuid()});
      }
    },
    removeDate: (state, action: PayloadAction<string>) => {
      state[EItemTypeProp.DATE] = state[EItemTypeProp.DATE].filter((elem) => elem.unique !== action.payload);
    },
    // prettier-ignore
    changeValueDate: (state, action: PayloadAction<{value: string, unique: string}>) => {
      state[EItemTypeProp.DATE] = state[EItemTypeProp.DATE].map((item) => (item.unique === action.payload.unique
        ?
        {...item, value: action.payload.value}
        :
        item));
    },
    // prettier-ignore
    changeKeyDate: (state, action: PayloadAction<{key: string, unique: string}>) => {
      state[EItemTypeProp.DATE] = state[EItemTypeProp.DATE].map((item) => (item.unique === action.payload.unique
        ?
        {...item, key: action.payload.key}
        :
        item));
    },

    reset: () => initialState,
  },
});

export const selectItem = (state: RootState) => state.createItem;
export const {
  setShow,
  setImage,
  setName,
  reset,
  appendStr,
  removeStr,
  changeValueStr,
  changeKeyStr,
  appendBool,
  removeBool,
  changeKeyBool,
  changeValueBool,
  appendInt,
  removeInt,
  changeValueInt,
  changeKeyInt,
  appendText,
  removeText,
  changeKeyText,
  changeValueText,
  appendDate,
  removeDate,
  changeKeyDate,
  changeValueDate,
} = createItemSlice.actions;
