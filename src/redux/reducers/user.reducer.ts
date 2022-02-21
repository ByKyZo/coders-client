import { getUser } from '@redux/actions/user.actions';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    username: '',
    email: '',
    loading: 'idle',
  },
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      console.log('LOADING');
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log('REJECTED');
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      console.log('COMPLETED', action);
    });
  },
});

export const {} = userSlice.actions;

export const initialState = userSlice.getInitialState();

export default userSlice.reducer;
