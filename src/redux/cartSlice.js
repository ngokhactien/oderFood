import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// =========================
// FETCH CART
// =========================
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// =========================
// ADD TO CART
// =========================
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",

  async ({ productId, optionId, quantity = 1 }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId,
            optionId,
            quantity,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      thunkAPI.dispatch(fetchCart());

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// =========================
// UPDATE QUANTITY
// =========================
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",

  async ({ productId, optionId, quantity }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId,
            optionId,
            quantity,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      thunkAPI.dispatch(fetchCart());

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// =========================
// REMOVE ITEM
// =========================
export const removeItemAsync = createAsyncThunk(
  "cart/removeItem",

  async ({ productId, optionId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId,
            optionId,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      thunkAPI.dispatch(fetchCart());

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// =========================
// CLEAR CART
// =========================
export const clearCartAsync = createAsyncThunk(
  "cart/clearCart",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/clear`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      thunkAPI.dispatch(fetchCart());

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const initialState = {
  items: [],

  totalAmount: 0,

  loading: false,

  error: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.items;

        state.totalAmount = action.payload.totalAmount;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ADD
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(addToCartAsync.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateQuantityAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateQuantityAsync.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // REMOVE
      .addCase(removeItemAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeItemAsync.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(removeItemAsync.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // CLEAR
      .addCase(clearCartAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(clearCartAsync.fulfilled, (state) => {
        state.loading = false;

        state.items = [];

        state.totalAmount = 0;
      })

      .addCase(clearCartAsync.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;