import { configureStore } from "@reduxjs/toolkit";
import { flowersReducer } from "./flowers/slice";
import { storesReducer } from "./stores/slice";
import { ordersReducer } from "./orders/slice";

export const store = configureStore({
  reducer: {
    flowers: flowersReducer,
    stores: storesReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
