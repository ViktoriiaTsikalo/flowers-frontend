import { createSlice } from "@reduxjs/toolkit";
import type { IStore } from "./operations";
import { fetchStores } from "./operations";

interface StoresState {
  stores: IStore[];
  loading: boolean;
  error: string | null;
}

const initialState: StoresState = {
  stores: [],
  loading: false,
  error: null,
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const storesReducer = storesSlice.reducer;
