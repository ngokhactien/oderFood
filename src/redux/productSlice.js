import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

/**
 * GET PRODUCTS
 */
export const fetchProducts = createAsyncThunk(
  "products/fetch",

  async (params) => {
    const res = await axios.get(
      "http://localhost:5000/api/products/search",
      { params },
    );

    return res.data;
  },
);

/**
 * GET PRODUCT DETAIL
 */
export const getProductById = createAsyncThunk(
  "products/getProductById",

  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`,
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data,
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    productDetail: null,

    page: 1,
    totalPages: 1,

    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /**
       * FETCH PRODUCTS
       */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.items =
            action.payload?.data || [];

          state.page =
            action.payload?.page || 1;

          state.totalPages =
            action.payload?.totalPages || 1;
        },
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      /**
       * PRODUCT DETAIL
       */
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        getProductById.fulfilled,
        (state, action) => {
          state.loading = false;

          state.productDetail =
            action.payload;
        },
      )

      .addCase(
        getProductById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export default productSlice.reducer;