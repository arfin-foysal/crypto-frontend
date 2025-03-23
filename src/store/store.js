import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { server } from "./server";

export const store = configureStore({
  reducer: {
    [server.reducerPath]: server.reducer,
    auth: authReducer,
    devTools: true,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(server.middleware),
});
