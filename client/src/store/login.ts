import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.role = action.payload;
    },
    logout(state) {
      state.role = '';
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
