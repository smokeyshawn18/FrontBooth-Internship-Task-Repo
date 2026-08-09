import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart.slice";
import { notificationReducer } from "./slices/notification.slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
