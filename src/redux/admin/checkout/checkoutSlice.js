// checkoutSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

// =========================
// CREATE CHECKOUT
// =========================
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",

  async (orderData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/checkout`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data.checkout;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =========================
// GET MY ORDERS
// =========================
export const getMyOrders = createAsyncThunk(
  "checkout/getMyOrders",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/checkout/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =========================
// GET ORDER DETAIL
// =========================
export const getOrderDetail = createAsyncThunk(
  "checkout/getOrderDetail",

  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/checkout/my-orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =========================
// INITIAL STATE
// =========================
const initialState = {
  loading: false,

  orders: [],

  order: null,

  error: null,
};

// =========================
// SLICE
// =========================
const checkoutSlice = createSlice({
  name: "checkout",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // CREATE ORDER
      // =========================
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload;

        toast.success("Đặt hàng thành công 🎉");
      })

      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        toast.error(action.payload);
      })

      // =========================
      // GET MY ORDERS
      // =========================
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload;
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // =========================
      // GET ORDER DETAIL
      // =========================
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload;
      })

      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
