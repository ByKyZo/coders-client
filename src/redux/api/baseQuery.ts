import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Custom base query avec axios pour redux rtk query
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: `${baseUrl}${url}`, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
