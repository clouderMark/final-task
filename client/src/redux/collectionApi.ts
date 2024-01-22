import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {
  ICollection,
  ICollectionReq,
  ICollectionUpdateReq,
  ICustomError,
  INumberOfRecords,
  IPageLimit,
  IToken,
  TToken,
} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

interface IDelete {
  token?: TToken | undefined | null;
  id: number;
}

interface IAllCollection {
  id: number;
  name: string;
  image: string;
  theme: string;
}

interface IRes extends INumberOfRecords {
  collections: IAllCollection[];
}

interface IPageLimitToken extends IPageLimit, IToken {}

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}collection`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    createCollection: builder.mutation<ICollection, ICollectionReq>({
      query: (data) => {
        const req: FetchArgs = {
          url: '/create',
          method: 'POST',
          body: data.data,
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
    }),

    updateCollection: builder.mutation<ICollection, ICollectionUpdateReq>({
      query: (data) => {
        const req: FetchArgs = {
          url: `/update/${data.id}`,
          method: 'PUT',
          body: data.data,
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
    }),

    getAllUserCollections: builder.mutation<IRes, IPageLimitToken>({
      query: (data) => {
        const {page, limit} = data;

        const req: FetchArgs = {
          url: '/getuserall',
          method: 'GET',
          params: {
            page,
            limit,
          },
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
    }),

    getOneCollection: builder.mutation<ICollection, {id: number}>({
      query: (data) => ({
        url: `/getone/${data.id}`,
        method: 'GET',
      }),
    }),

    deleteCollection: builder.mutation<ICollection, IDelete>({
      query: (data) => {
        const req: FetchArgs = {
          url: `/delete/${data.id}`,
          method: 'DELETE',
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
    }),
  }),
});

export const {
  useGetOneCollectionMutation,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useGetAllUserCollectionsMutation,
  useDeleteCollectionMutation,
} = collectionApi;
