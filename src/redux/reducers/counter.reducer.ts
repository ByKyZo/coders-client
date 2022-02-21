import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value--;
    },
    add: (state, payload: PayloadAction<number>) => {
      state.value += payload.payload;
    },
  },
});

export const { increment, decrement, add } = counterSlice.actions;

export default counterSlice.reducer;
