import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../flowers/operations";

export interface IOrderItem {
  flower: string;
  quantity: number;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  items: IOrderItem[];
  customerName: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  orderDate: Date;
}

export interface ICreateOrderPayload {
  items: IOrderItem[];
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

export interface ICreateOrderResponse {
  status: number;
  message: string;
  data: IOrder;
}

export const createOrder = createAsyncThunk<
  ICreateOrderResponse,
  ICreateOrderPayload,
  { rejectValue: string }
>("orders/createOrder", async (orderData, thunkAPI) => {
  try {
    const response = await API.post<ICreateOrderResponse>("/orders", orderData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export interface IOrderItemDetails {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface IOrderDetails {
  orderNumber: string;
  items: IOrderItemDetails[];
  totalPrice: number;
  address: string;
  orderDate: string;
}

export const fetchOrderDetails = createAsyncThunk<
  IOrderDetails,
  string,
  { rejectValue: string }
>("orders/fetchOrderDetails", async (orderId, thunkAPI) => {
  try {
    const response = await API.get<{
      status: number;
      message: string;
      data: IOrderDetails;
    }>(`/orders/${orderId}`);
    console.log(response.data);
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue("Unknown error");
  }
});
