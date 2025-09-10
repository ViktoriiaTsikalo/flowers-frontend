import type { RootState } from "../store";

export const selectFlowers = (state: RootState) => state.flowers.flowers;

export const selectFavorites = (state: RootState) => state.flowers.favorites;

export const selectFlowersLoading = (state: RootState) => state.flowers.loading;
export const selectFlowersError = (state: RootState) => state.flowers.error;
export const selectCart = (state: RootState) => state.flowers.cart;
