import type { RootState } from "../store";

export const selectStores = (state: RootState) => state.stores.stores;

export const selectStoresLoading = (state: RootState) => state.stores.loading;

export const selectStoresError = (state: RootState) => state.stores.error;
