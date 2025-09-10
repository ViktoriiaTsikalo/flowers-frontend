import type { RootState } from "../store";

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersError = (state: RootState) => state.orders.error;

export const selectOrder = (state: RootState) => state.orders.order;
export const selectOrderLoading = (state: RootState) => state.orders.loading;
export const selectOrderError = (state: RootState) => state.orders.error;
