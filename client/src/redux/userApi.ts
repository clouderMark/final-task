import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {IChangeRole, ICustomError, IPublickUser, IToken, IUser} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}user`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    changeUserRole: builder.mutation<IUser, IChangeRole>({
      query: (data) => ({
        url: `/changerole/${data.id}`,
        method: 'PUT',
        body: {...data},
        headers: {authorization: `Bearer ${data.token}`},
      }),
    }),
    getAllUsers: builder.mutation<IPublickUser[], IToken>({
      query: (data) => ({
        url: '/getall',
        method: 'PUT',
        headers: {authorization: `Bearer ${data.token}`},
      }),
    }),
  }),
});

export const {useChangeUserRoleMutation} = userApi;
