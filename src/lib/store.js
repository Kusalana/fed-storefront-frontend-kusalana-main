import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import cartReducer from "./features/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Api } from "./api";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    user: userReducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

setupListeners(store.dispatch);
