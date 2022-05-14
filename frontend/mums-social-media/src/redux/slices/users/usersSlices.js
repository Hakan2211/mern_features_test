import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import baseAPI from "../../../apis/baseAPI";

//--------------------------
// ResetAction
//--------------------------
const resetLogin = createAction("resetLogin/reset");
const resetRegister = createAction("resetRegister/reset");
const resetUpdate = createAction("resetUpdate/reset");
const resetPassword = createAction("resetPassword/reset");
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
  "users/profile",
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
// Update User Profile Action - Thunk
//----------------------------------------------------------------

export const updateUserAction = createAsyncThunk(
  "users/update",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.patch(
        "/users",
        { name: user?.name, email: user?.email, bio: user?.bio },
        config
      );

      dispatch(resetUpdate());
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
// fetch single user - Thunk
//----------------------------------------------------------------

export const fetchUserDetailAction = createAsyncThunk(
  "users/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.get(`/users/${id}`, config);
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
// Follow User - Thunk
//----------------------------------------------------------------

export const followUserAction = createAsyncThunk(
  "users/follow",
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.patch(
        `/users/follow`,
        { followId: userToFollowId },
        config
      );
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
// Unfollow User - Thunk
//----------------------------------------------------------------

export const unfollowUserAction = createAsyncThunk(
  "users/unfollow",
  async (userToUnfollowId, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await baseAPI.patch(
        `/users/unfollow`,
        { unfollowId: userToUnfollowId },
        config
      );
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

//------------------------------
// Upload Profile Photo
//------------------------------
export const uploadProfilePhotoAction = createAsyncThunk(
  "users/uploadProfilePhoto",
  async (image, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const formData = new FormData();

      formData.append("image", image?.image);

      const { data } = await baseAPI.patch(
        "users/profilephoto-upload",
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
// Update password
//------------------------------
export const updatePasswordAction = createAsyncThunk(
  "password/update",
  async (password, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await baseAPI.patch(
        "users/password",
        { password },
        config
      );

      dispatch(resetPassword());
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
// Password Reset - Thunk
//----------------------------------------------------------------

export const passwordResetAction = createAsyncThunk(
  "password/reset",
  async (email, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await baseAPI.post(
        "auth/forget-password",
        { email },
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
// Password Reset after Email Token  - Thunk
//----------------------------------------------------------------

export const passwordResetTokenAction = createAsyncThunk(
  "password/resetToken",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await baseAPI.patch(
        "auth/reset-password",
        { password: user?.password, token: user?.token },
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
    // Update User Profile
    //--------------------------
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetUpdate, (state, action) => {
      state.userIsUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.userIsUpdated = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Update Password
    //--------------------------
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetPassword, (state, action) => {
      state.passwordIsUpdated = true;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordUpdated = action?.payload;
      state.passwordIsUpdated = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });

    //--------------------------
    // Password Reset
    //--------------------------
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Password Reset Token Action
    //--------------------------
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordResetToken = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Upload Profile Photo
    //--------------------------
    builder.addCase(uploadProfilePhotoAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
      state.profilePhoto = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Fetch Single User
    //--------------------------
    builder.addCase(fetchUserDetailAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchUserDetailAction.fulfilled, (state, action) => {
      state.userDetails = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserDetailAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Follow User
    //--------------------------
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.followed = action?.payload;
      state.unfollowed = undefined;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload.message;
      state.serverError = action?.error.message;
    });
    //--------------------------
    // Unfollow User
    //--------------------------
    builder.addCase(unfollowUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
      state.unfollowed = action?.payload;
      state.followed = undefined;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(unfollowUserAction.rejected, (state, action) => {
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
