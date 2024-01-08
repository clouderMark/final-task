import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, ILogin, ISignup, IToken} from '../../../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}user`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    signupUser: builder.mutation<IToken, ISignup>({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: {...data},
      }),
    }),
    loginUser: builder.mutation<IToken, ILogin>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: {...data},
      }),
    }),
    checkUser: builder.mutation<IToken, string>({
      query: (token) => ({
        url: '/check',
        method: 'GET',
        headers: {authorization: `Bearer ${token}`},
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useCheckUserMutation,
} = loginApi;
