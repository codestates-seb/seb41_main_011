import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './login';
import testReducer from './test';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    test: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
