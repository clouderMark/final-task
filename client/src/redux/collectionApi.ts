import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, INumberOfRecords, IPageLimit, TId, TToken} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

interface IReq {
  token?: TToken | undefined | null;
  data: FormData;
}

interface IDelete {
  token?: TToken | undefined | null;
  id: number;
}

interface ICollection {
  id: number;
  name: string;
  description: string;
  theme: string;
  image: string;
  visible: boolean;
  item_props_types: {
    value: string;
  }[];
  userId: TId;
}

interface IRes extends INumberOfRecords {
  collections: ICollection[];
}

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}collection`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    createCollection: builder.mutation<ICollection, IReq>({
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

    updateCollection: builder.mutation<ICollection, IReq>({
      query: (data) => {
        const req: FetchArgs = {
          url: '/update',
          method: 'PUT',
          body: data.data,
        };

        if (data.token) req.headers = {authorization: `Bearer ${data.token}`};

        return req;
      },
    }),

    getAllCollections: builder.mutation<IRes, IPageLimit>({
      query: (data) => {
        const {page, limit} = data;

        return {
          url: '/getall',
          method: 'GET',
          params: {
            page,
            limit,
          },
        };
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
  useGetAllCollectionsMutation,
} = collectionApi;
