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
        `http://localhost:5000/api/comments/product/${productId}`,
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

/**
 * GET ALL COMMENT
 */
export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/comments");
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
      const res = await axios.post("http://localhost:5000/api/comments", data);

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
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);

      return commentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCommentDetail = createAsyncThunk(
  "comments/getCommentDetail",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateCommentStatus = createAsyncThunk(
  "comments/updateCommentStatus",

  async ({ id, isHidden }, thunkAPI) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/comments/${id}/status`,
        { isHidden },
      );

      return res.data;
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
    commentDetail: null,
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
       * GET ALL
       */
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })

      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // comment detail id
      .addCase(getCommentDetail.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCommentDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.commentDetail = action.payload;
      })

      .addCase(getCommentDetail.rejected, (state) => {
        state.loading = false;
      })

      // UPDATE STATUS
      .addCase(updateCommentStatus.fulfilled, (state, action) => {
        state.commentDetail = action.payload;

        state.comments = state.comments.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
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
