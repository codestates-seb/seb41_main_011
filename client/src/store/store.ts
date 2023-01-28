import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './login';
import testReducer from './test';

const store = configureStore({
  reducer: {
    login: loginReducer,
    test: testReducer,
  },
});

export default store;
