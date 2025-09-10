import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchFlowers, type IFlower } from "./operations";

const FAVORITES_KEY = "favoriteFlowers";
const CART_KEY = "cartFlowers";

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ігноруємо помилки
  }
};

export interface CartItem {
  _id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
}

interface FlowersState {
  flowers: IFlower[];
  favorites: string[];
  cart: CartItem[];
  loading: boolean;
  error: unknown;
}

const initialState: FlowersState = {
  flowers: [],
  favorites: loadFromStorage<string[]>(FAVORITES_KEY, []),
  cart: loadFromStorage<CartItem[]>(CART_KEY, []),
  loading: false,
  error: null,
};

const flowersSlice = createSlice({
  name: "flowers",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id);
      } else {
        state.favorites.push(id);
      }
      saveToStorage(FAVORITES_KEY, state.favorites);
    },

    toggleCart: (state, action: PayloadAction<CartItem>) => {
      const flower = action.payload;
      const isInCart = state.cart.some((item) => item._id === flower._id);

      if (isInCart) {
        state.cart = state.cart.filter((item) => item._id !== flower._id);
      } else {
        state.cart.push({ ...flower, quantity: 1 });
      }
      saveToStorage(CART_KEY, state.cart);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      saveToStorage(CART_KEY, state.cart);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveToStorage(CART_KEY, state.cart);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
      saveToStorage(CART_KEY, state.cart);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlowers.fulfilled, (state, action) => {
        state.loading = false;
        state.flowers = action.payload;
      })
      .addCase(fetchFlowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const {
  toggleFavorite,
  toggleCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = flowersSlice.actions;

export const flowersReducer = flowersSlice.reducer;
