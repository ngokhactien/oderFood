import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

// =======================
// GET OR CREATE
// =======================
export const getOrCreateOrder = createAsyncThunk(
  "order/getOrCreate",
  async ({ tableId, table }, { getState }) => {
    const token = getState().auth.token;

    const res = await axiosClient.post(
      "/orders",
      { tableId, table },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  },
);

// =======================
// ADD ITEM
// =======================
export const addItem = createAsyncThunk(
  "order/addItem",
  async ({ orderId, product }, { getState }) => {
    const token = getState().auth.token;

    const res = await axiosClient.post(
      `/orders/${orderId}/item`,
      { product },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  },
);

// =======================
// UPDATE QTY
// =======================
export const updateQty = createAsyncThunk(
  "order/updateQty",
  async ({ orderId, itemId, qty }, { getState }) => {
    const token = getState().auth.token;

    const res = await axiosClient.put(
      `/orders/${orderId}/item/${itemId}`,
      { qty },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  },
);

// =======================
// REMOVE ITEM
// =======================
export const removeItem = createAsyncThunk(
  "order/removeItem",
  async ({ orderId, itemId }, { getState }) => {
    const token = getState().auth.token;

    const res = await axiosClient.delete(`/orders/${orderId}/item/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
);

// =======================
// PAY
// =======================
export const payOrder = createAsyncThunk(
  "order/pay",
  async (orderId, { getState }) => {
    const token = getState().auth.token;

    const res = await axiosClient.put(
      `/orders/${orderId}/pay`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  },
);

// xác nhânk
export const confirmOrder = createAsyncThunk(
  "order/confirm",
  async (orderId, { getState }) => {
    const token = getState().auth.token;

    const res = await axiosClient.put(
      `/orders/${orderId}/confirm`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return res.data;
  },
);

export const getActiveOrders = createAsyncThunk(
  "order/getActive",
  async (_, { getState }) => {
    const token = getState().auth.token;

    const res = await axiosClient.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
);

// =======================
// SLICE
// =======================
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    // currentOrder: null,
    loading: false,
    actionType: null,
     requests: [],
  },
  reducers: {
    clearOrder: (state) => {
      // state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // =======================
      // GET OR CREATE
      // =======================
      .addCase(getOrCreateOrder.pending, (state) => {
        state.loading = true;
        state.actionType = "getOrCreate";
      })
      .addCase(getOrCreateOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.currentOrder = action.payload;
        state.actionType = null;
      })
      .addCase(getOrCreateOrder.rejected, (state) => {
        state.loading = false;
        state.actionType = null;
      })

      // =======================
      // ADD ITEM
      // =======================
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.actionType = "addItem";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        // state.currentOrder = action.payload;
        state.actionType = null;
      })
      .addCase(addItem.rejected, (state) => {
        state.loading = false;
        state.actionType = null;
      })

      // =======================
      // UPDATE QTY
      // =======================
      .addCase(updateQty.pending, (state) => {
        state.loading = true;
        state.actionType = "updateQty";
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        state.loading = false;
        // state.currentOrder = action.payload;
        state.actionType = null;
      })
      .addCase(updateQty.rejected, (state) => {
        state.loading = false;
        state.actionType = null;
      })

      // =======================
      // REMOVE
      // =======================
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
        state.actionType = "removeItem";
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.loading = false;
        // state.currentOrder = action.payload;
        state.actionType = null;
      })
      .addCase(removeItem.rejected, (state) => {
        state.loading = false;
        state.actionType = null;
      })

      // =======================
      // CONFIRM
      // =======================
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.actionType = "confirm";
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.currentOrder = action.payload;
        state.actionType = null;
      })
      .addCase(confirmOrder.rejected, (state) => {
        state.loading = false;
        state.actionType = null;
      })

      // =======================
      // PAY
      // =======================
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
        state.actionType = "pay";
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.loading = false;
        // state.currentOrder = null;
        state.actionType = null;
      })
      .addCase(payOrder.rejected, (state) => {
        state.loading = false;
        state.actionType = null;
      })

      // =======================
      // GET ACTIVE
      // =======================
      .addCase(getActiveOrders.pending, (state) => {
        state.loading = true;
        state.actionType = "getActive";
      })
      .addCase(getActiveOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        // state.currentOrder = action.payload[0] || null;
        state.actionType = null;
      })
      .addCase(getActiveOrders.rejected, (state) => {
        state.loading = false;
        state.actionType = null;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
