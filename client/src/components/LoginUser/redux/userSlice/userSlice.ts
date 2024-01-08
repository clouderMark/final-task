import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import type {RootState} from '../../../../redux/store';
import {ERole, IToken} from '../../../../types/types';
import {loginApi} from '../loginApi';
import {initialState} from './initialState';
import {EToken, IRegistration} from './types';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IToken>) => {
      const {token} = action.payload;

      const user = jwtDecode(token) as IRegistration;

      localStorage.setItem(EToken.TOKEN, token);

      state.id = user.id;
      state.email = user.email;
      state.isAuth = true;
      state.isAdmin = user.role === ERole.ADMIN;
      state.token = token;
      state.name = user.name;
    },
    logout: () => {
      localStorage.removeItem(EToken.TOKEN);

      return initialState;
    },
    getToken: (state) => {
      const token = localStorage.getItem(EToken.TOKEN);

      state.token = token;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(loginApi.endpoints.checkUser.matchFulfilled, (state, {payload}) => {
        const {token} = payload;

        const user = jwtDecode(token) as IRegistration;

        localStorage.setItem(EToken.TOKEN, token);

        state.id = user.id;
        state.email = user.email;
        state.isAuth = true;
        state.isAdmin = user.role === ERole.ADMIN;
        state.token = token;
        state.name = user.name;
      })
      .addMatcher(loginApi.endpoints.checkUser.matchRejected, () => {
        localStorage.removeItem(EToken.TOKEN);

        return initialState;
      })
      .addMatcher(loginApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => {
        const {token} = payload;

        const user = jwtDecode(token) as IRegistration;

        localStorage.setItem(EToken.TOKEN, token);

        state.id = user.id;
        state.email = user.email;
        state.isAuth = true;
        state.isAdmin = user.role === ERole.ADMIN;
        state.token = token;
        state.name = user.name;
      })
      .addMatcher(loginApi.endpoints.signupUser.matchFulfilled, (state, {payload}) => {
        const {token} = payload;

        const user = jwtDecode(token) as IRegistration;

        localStorage.setItem(EToken.TOKEN, token);

        state.id = user.id;
        state.email = user.email;
        state.isAuth = true;
        state.isAdmin = user.role === ERole.ADMIN;
        state.token = token;
        state.name = user.name;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const {login, logout, getToken} = userSlice.actions;
