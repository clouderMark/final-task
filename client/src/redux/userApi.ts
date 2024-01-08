import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {IChangeUser, ICustomError, IUser, IToken} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

interface IReq extends IToken {
  page: number;
  limit: number;
}

interface IRes {
  users: IUser[];
  numberOfRecords: number;
}

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
    getAllUsers: builder.mutation<IRes, IReq>({
      query: (data) => {
        const {token, page, limit} = data;

        return {
          url: '/getall',
          method: 'GET',
          headers: {authorization: `Bearer ${token}`},
          params: {
            // GET-параметры для постраничной навигации
            page,
            limit,
          },
        };
      },
    }),
  }),
});

export const {useChangeUserRoleMutation, useGetAllUsersMutation, useChangeUserStatusMutation} = userApi;
