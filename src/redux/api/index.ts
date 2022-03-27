import { axiosBaseQuery } from '@redux/api/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<any, number>({
      query: (id) => ({ url: `/users/${id}`, method: 'GET' }),
    }),
  }),
});

export default api;

export const { useGetUserByIdQuery } = api;
