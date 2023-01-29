import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface LoginState {
  role: string;
}

const initialState: LoginState = {
  role: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
    logout(state) {
      state.role = '';
    },
  },
});

export const loginActions = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login.role;

export default loginSlice.reducer;
