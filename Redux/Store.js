import {configureStore} from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
import shelfReducer from './reducers/productsOnShelfSlice';
import registrationReducer from './reducers/registrationSlice';

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    shelf: shelfReducer,
    registration: registrationReducer,
  },
});
