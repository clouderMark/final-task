import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {createSlice} from '@reduxjs/toolkit';
import {
  ICollection,
  ICollectionReq,
  ICollectionUpdateReq,
  ICustomError,
  INumberOfRecords,
  IPageLimit,
  IToken,
  TId,
  TToken,
} from '../types/types';
import type {RootState} from './store';

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

interface ICollectionInitialState {
  itemPropTypes: string[];
  id: TId | null;
}

const collectionInitialState: ICollectionInitialState = {
  itemPropTypes: [],
  id: null,
};

export const collectionSlice = createSlice({
  name: 'collectionSlice',
  initialState: collectionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(collectionApi.endpoints.getOneCollection.matchFulfilled, (state, {payload}) => {
      state.itemPropTypes = payload.item_prop_types.map((el) => el.value);
      state.id = payload.id;
    });
  },
});

export const selectCollection = (state: RootState) => state.collection;

export const {
  useGetOneCollectionMutation,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useGetAllUserCollectionsMutation,
  useDeleteCollectionMutation,
} = collectionApi;
