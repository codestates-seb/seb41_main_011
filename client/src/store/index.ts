import { createSlice, configureStore } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: { role: '' },
  reducers: {
    login: (state: any, action: any) => {
      state.role = action.payload;
    },
    logout: (state: any) => {
      state.value = { role: '' };
    },
  },
});

const store = configureStore({
  reducer: { login: loginSlice.reducer },
});
export const loginAction = loginSlice.actions;

export default store;
