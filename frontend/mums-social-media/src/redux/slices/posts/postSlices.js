import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import baseAPI from "../../../apis/baseAPI";

//----------------------------------------------------------------
// Posts Action - Thunk
//----------------------------------------------------------------

//------------------------------
// Reset Post
//------------------------------
const resetPost = createAction("post/reset");

//------------------------------
// Create Post
//------------------------------
export const createPostAction = createAsyncThunk(
  "posts/create",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);

      const { data } = await baseAPI.post("posts", formData, config);

      //Dispatch Action to reset post
      dispatch(resetPost());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);
//------------------------------
// Update Post
//------------------------------
export const updatePostAction = createAsyncThunk(
  "posts/update",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);

      const { data } = await baseAPI.patch(
        `posts/${post?.id}`,
        formData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);
//------------------------------
// Fetch all Posts
//------------------------------
export const fetchPostsAction = createAsyncThunk(
  "posts/list",
  async (post, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await baseAPI.get("posts");

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);
//------------------------------
// Fetch Single Posts
//------------------------------
export const fetchPostDetailAction = createAsyncThunk(
  "posts/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await baseAPI.get(`posts/${id}`);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);
//------------------------------
// Add Likes to a post
//------------------------------
export const toggleLikePostAction = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await baseAPI.patch(`/posts/likes`, { postId }, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);
//------------------------------
//  Disikes a post
//------------------------------
export const toggleDislikePostAction = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await baseAPI.patch(
        `/posts/dislikes`,
        { postId },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

//----------------------------------------------------------------
// Slices
//----------------------------------------------------------------

const postsSlices = createSlice({
  name: "posts",
  initialState: {},
  extraReducers: (builder) => {
    //------------------------------
    // Create Posts
    //------------------------------
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postCreated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.isCreated = false;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
    //------------------------------
    // Update post
    //------------------------------
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postUpdated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
    //------------------------------
    // Fetch all Posts
    //------------------------------
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postLists = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
    //------------------------------
    // Fetch single post
    //------------------------------
    builder.addCase(fetchPostDetailAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetailAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postDetail = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchPostDetailAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
    //------------------------------
    // Like a post
    //------------------------------
    builder.addCase(toggleLikePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleLikePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.likes = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(toggleLikePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
    //------------------------------
    // Dislike a post
    //------------------------------
    builder.addCase(toggleDislikePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleDislikePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.disLikes = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(toggleDislikePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default postsSlices.reducer;
