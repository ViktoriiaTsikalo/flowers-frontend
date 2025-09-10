import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchOrderDetails,
  type ICreateOrderResponse,
  type IOrder,
  type IOrderDetails,
} from "./operations";

interface OrdersState {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
  order: IOrderDetails | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  order: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<ICreateOrderResponse>) => {
          state.loading = false;
          state.orders.push(action.payload.data);
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderDetails.fulfilled,
        (state, action: PayloadAction<IOrderDetails>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order details";
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
