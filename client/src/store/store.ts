import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './login';
import testReducer from './test';
import paymentReducer from './payment';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    test: testReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
