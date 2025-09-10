import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const API = axios.create({
  baseURL: "https://flowers-backend-ypdc.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface GetFlowersOptions {
  storeId?: string;
  sortBy?: "price" | "addedAt";
  sortOrder?: "asc" | "desc";
}

export interface IFlower {
  _id: string;
  name: string;
  photo: string;
  price: number;
  addedAt: string;
  storeId: string;
}

export const fetchFlowers = createAsyncThunk<
  IFlower[],
  GetFlowersOptions,
  { rejectValue: string }
>("flowers/fetchFlowers", async (options, thunkAPI) => {
  try {
    const response = await API.get<{ data: IFlower[] }>("/flowers", {
      params: {
        storeId: options.storeId,
        sortBy: options.sortBy,
        sortOrder: options.sortOrder,
      },
    });
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});
