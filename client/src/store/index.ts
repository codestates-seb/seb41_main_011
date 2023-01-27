import { createSlice, configureStore } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: { role: '', isLoggined: false },
  reducers: {
    login: (state: any, action: any) => {
      state.value = action.payload;
    },
    logout: (state: any) => {
      state.value = { role: '', isLoggined: false };
    },
  },
});

const store = configureStore({
  reducer: { login: loginSlice.reducer },
});
export const loginAction = loginSlice.actions;

export default store;
