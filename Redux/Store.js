import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
