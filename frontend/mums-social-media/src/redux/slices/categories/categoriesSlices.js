import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import baseAPI from "../../../apis/baseAPI";

//-----------------------------------------------------------------------------
// Action to Redirect - Remove Redux State after Updating and Deleting, so you can redirect
//-----------------------------------------------------------------------------
const resetEditAction = createAction("category/reset");
const resetDeleteAction = createAction("category/resetDelete");
const resetCategoryAction = createAction("category/resetAddCategory");

//----------------------------------------------------------------
// Category Action - Thunk
//----------------------------------------------------------------

//------------------------------
// Create Category
//------------------------------
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("title", category?.title);
      formData.append("image", category?.image);

      const { data } = await baseAPI.post("/category", formData, config);
      //----------------------------------------------------
      //Dispatch Action to redirect after creating Category
      //----------------------------------------------------
      dispatch(resetCategoryAction());
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
// Fetch Categories
//------------------------------

export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.get("/category", config);
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
// Fetch Single Category
//------------------------------

export const fetchCategoryAction = createAsyncThunk(
  "category/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.get(`/category/${id}`, config);
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
// Update Category
//------------------------------

export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.patch(
        `/category/${category.id}`,
        { title: category?.title, image: category?.image },
        config
      );
      //------------------------------------------
      //Dispatch Action to reset the updated data
      //------------------------------------------
      dispatch(resetEditAction());

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
// Delete Category
//------------------------------

export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.delete(`/category/${id}`, config);
      //------------------------------
      //Dispatch Delete Action
      //------------------------------
      dispatch(resetDeleteAction());
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
// Category Slices
//----------------------------------------------------------------

const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    //------------------------------
    // Create Category
    //------------------------------
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    //------------------------------------
    // Dispatch Action for Redirecting
    //------------------------------------
    builder.addCase(resetCategoryAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
      state.isCreated = false;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error;
    });

    //------------------------------
    // Fetch Categories
    //------------------------------
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
      state.categoryList = action?.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error;
    });

    //------------------------------
    // Fetch Single Category
    //------------------------------
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
      state.category = action?.payload;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error;
    });
    //------------------------------
    // Update Category
    //------------------------------
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    //------------------------------------
    // Dispatch Reset Action for Redirect
    //------------------------------------
    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
      state.updatedCategory = action?.payload;
      state.isEdited = false;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error;
    });
    //------------------------------
    // Delete Category
    //------------------------------
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    //------------------------------------
    // Dispatch Reset Action for Redirect
    //------------------------------------
    builder.addCase(resetDeleteAction.apply, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
      state.deletedCategory = action?.payload;
      state.isDeleted = false;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error;
    });
  },
});

export default categorySlices.reducer;
