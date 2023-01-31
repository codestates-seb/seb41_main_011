import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchKeyword: '',
};

const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    result(state, action) {
      state.searchKeyword = action.payload;
    },
  },
});

export const testActions = testSlice.actions;

export default testSlice.reducer;
