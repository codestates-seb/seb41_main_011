import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  programId: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    programId(state, action) {
      state.programId = action.payload;
    },
  },
});

export const paymentActions = paymentSlice.actions;

export default paymentSlice.reducer;
