import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {
  ICollectionReq,
  ICustomError,
  INumberOfRecords,
  IPageLimit,
} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

interface IItem {
  id: number;
  name: string;
  collectionId: string;
  authorName?: string;
  image: string;
}

interface IAllItems extends INumberOfRecords {
  items: IItem[];
}

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}item`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getAllItems: builder.mutation<IAllItems, IPageLimit>({
      query: (data) => {
        const {page, limit} = data;

        const req: FetchArgs = {
          url: '/getall',
          method: 'GET',
          params: {
            page,
            limit,
          },
        };

        return req;
      },
    }),

    createItem: builder.mutation<IItem, ICollectionReq>({
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

    getItemsById: builder.mutation<IItem[], {id: number}>({
      query: (data) => {
        const req: FetchArgs = {
          url: `/getbyid/${data.id}`,
          method: 'GET',
        };

        return req;
      },
    }),
  }),
});

export const {useGetAllItemsMutation, useCreateItemMutation, useGetItemsByIdMutation} = itemApi;
