import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postId: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    id(state, action) {
      state.postId = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
