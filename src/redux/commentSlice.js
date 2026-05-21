import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

/**
 * GET COMMENTS
 */
export const getCommentsByProduct = createAsyncThunk(
  "comments/getCommentsByProduct",

  async (productId, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${productId}`,
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

/**
 * CREATE COMMENT
 */
export const createComment = createAsyncThunk(
  "comments/createComment",

  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        data,
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

/**
 * DELETE COMMENT
 */
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",

  async (commentId, thunkAPI) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/comments/${commentId}`,
      );

      return commentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const commentSlice = createSlice({
  name: "comments",

  initialState: {
    comments: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /**
       * GET
       */
      .addCase(getCommentsByProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCommentsByProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.comments = action.payload;
      })

      .addCase(getCommentsByProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /**
       * CREATE
       */
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })

      /**
       * DELETE
       */
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export default commentSlice.reducer;