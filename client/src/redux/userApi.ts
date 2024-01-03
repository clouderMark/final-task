import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {IChangeUser, ICustomError, IUser, IToken} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}user`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    changeUserRole: builder.mutation<IUser, IChangeUser>({
      query: (data) => ({
        url: `/changerole/${data.id}`,
        method: 'PUT',
        headers: {authorization: `Bearer ${data.token}`},
      }),
    }),
    changeUserStatus: builder.mutation<IUser, IChangeUser>({
      query: (data) => ({
        url: `/changestatus/${data.id}`,
        method: 'PUT',
        headers: {authorization: `Bearer ${data.token}`},
      }),
    }),
    getAllUsers: builder.mutation<IUser[], IToken>({
      query: (data) => ({
        url: '/getall',
        method: 'GET',
        headers: {authorization: `Bearer ${data.token}`},
      }),
    }),
  }),
});

export const {useChangeUserRoleMutation, useGetAllUsersMutation, useChangeUserStatusMutation} = userApi;
