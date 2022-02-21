import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk(
  '/user/fetchById',
  async (payload, thunkAPI) => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    return response.data;
  }
);
