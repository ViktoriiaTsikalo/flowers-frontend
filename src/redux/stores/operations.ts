import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../flowers/operations";

export interface IStore {
  _id: string;
  name: string;
}

export const fetchStores = createAsyncThunk<
  IStore[],
  void,
  { rejectValue: string }
>("stores/fetchStores", async (_, thunkAPI) => {
  try {
    const response = await API.get<IStore[]>("/stores");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});
