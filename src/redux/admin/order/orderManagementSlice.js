import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

// =========================
// GET ALL ORDERS
// =========================
export const getAllOrders = createAsyncThunk(
  "adminOrders/getAllOrders",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/checkout`,
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
// UPDATE STATUS
// =========================
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",

  async ({ id, orderStatus }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/checkout/status/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            orderStatus,
          }),
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
// CANCEL ORDER
// =========================
export const cancelOrderAdmin = createAsyncThunk(
  "adminOrders/cancelOrder",

  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/checkout/cancel/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =========================
// GET ORDER DETAIL
// =========================
export const getOrderDetail = createAsyncThunk(
  "adminOrders/getOrderDetail",

  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/checkout/${id}`,
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

const orderManagementSlice = createSlice({
  name: "adminOrders",

  initialState: {
    loading: false,
    orders: [],
    orderDetail: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload;
      })

      // UPDATE
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.orders[index].orderStatus = action.payload.orderStatus;
        }

        toast.success("Cập nhật trạng thái thành công");
      })

      // CANCEL
      .addCase(cancelOrderAdmin.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (item) => item._id === action.payload,
        );

        if (index !== -1) {
          state.orders[index].orderStatus = "cancelled";
        }

        toast.success("Đã hủy đơn hàng");
      })

      // DETAIL
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;

        state.orderDetail = action.payload;
      })

      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default orderManagementSlice.reducer;
