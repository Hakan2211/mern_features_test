import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import baseAPI from "../../../apis/baseAPI";

//--------------------------
// ResetAction
//--------------------------
const resetLogin = createAction("resetLogin/reset");
const resetRegister = createAction("resetRegister/reset");
//----------------------------------------------------------------
// Register Action - Thunk
//----------------------------------------------------------------

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await baseAPI.post("auth/register", user, config);

      dispatch(resetRegister());
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
// Login Action - Thunk
//----------------------------------------------------------------
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await baseAPI.post("auth/login", userData, config);

      // Save User Credentials in LocalStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch(resetLogin());
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
// Profile - Thunk
//----------------------------------------------------------------

export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.get(`/users/profile/${id}`, config);
      //----------------------------------------------------
      //Dispatch Action to redirect after creating Category
      //----------------------------------------------------

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
// Logout Action - Thunk
//----------------------------------------------------------------
export const logoutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

//----------------------------------------------------------------
// Get User from Local Storage and place into store
//----------------------------------------------------------------
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//----------------------------------------------------------------
// Slices
//----------------------------------------------------------------

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //--------------------------
    // Register
    //--------------------------
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetRegister, (state, action) => {
      state.isRegistered = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.isRegistered = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Login
    //--------------------------
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetLogin, (state, action) => {
      state.isLogged = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
      state.isLogged = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Profile
    //--------------------------
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Logout
    //--------------------------
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.registered = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
  },
});

export default usersSlices.reducer;
