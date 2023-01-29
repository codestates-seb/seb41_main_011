import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstVisit: true,
};

const introSlice = createSlice({
  name: 'intro',
  initialState: initialState,
  reducers: {
    intro(state, action) {
      state.firstVisit = action.payload;
    },
  },
});

export const introActions = introSlice.actions;

export default introSlice.reducer;
