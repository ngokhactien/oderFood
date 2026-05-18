import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

const API =
  "http://localhost:5000/api/products";

//
// FETCH PRODUCTS
//
export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",
    async () => {
      const { data } =
        await axios.get(API);

      return data;
    },
  );

//
// FETCH PRODUCT
//
export const fetchProduct =
  createAsyncThunk(
    "products/fetchProduct",
    async (id) => {
      const { data } =
        await axios.get(
          `${API}/${id}`,
        );

      return data;
    },
  );

//
// ADD PRODUCT
//
export const addProduct =
  createAsyncThunk(
    "products/addProduct",
    async (product) => {
      const { data } =
        await axios.post(
          API,
          product,
        );

      return data;
    },
  );

//
// EDIT PRODUCT
//
export const editProduct =
  createAsyncThunk(
    "products/editProduct",
    async ({ id, product }) => {
      const { data } =
        await axios.put(
          `${API}/${id}`,
          product,
        );

      return data;
    },
  );

//
// DELETE PRODUCT
//
export const removeProduct =
  createAsyncThunk(
    "products/removeProduct",
    async (id) => {
      await axios.delete(
        `${API}/${id}`,
      );

      return id;
    },
  );

const adminProductSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    product: null,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      //
      // FETCH
      //
      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        },
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            action.payload;
        },
      )

      //
      // SINGLE
      //
      .addCase(
        fetchProduct.fulfilled,
        (state, action) => {
          state.product =
            action.payload;
        },
      )

      //
      // ADD
      //
      .addCase(
        addProduct.fulfilled,
        (state, action) => {
          state.products.unshift(
            action.payload,
          );
        },
      )

      //
      // EDIT
      //
      .addCase(
        editProduct.fulfilled,
        (state, action) => {
          state.products =
            state.products.map(
              (item) =>
                item._id ===
                action.payload._id
                  ? action.payload
                  : item,
            );
        },
      )

      //
      // DELETE
      //
      .addCase(
        removeProduct.fulfilled,
        (state, action) => {
          state.products =
            state.products.filter(
              (item) =>
                item._id !==
                action.payload,
            );
        },
      );
  },
});

export default adminProductSlice.reducer;