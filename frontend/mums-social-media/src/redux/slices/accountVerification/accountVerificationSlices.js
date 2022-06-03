import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import baseAPI from "../../../apis/baseAPI";

//------------------------------
// Reset for Redirect
//------------------------------
const resetAccountVerification = createAction(
  "accountVerification/verify-reset"
);

//------------------------------
// Account Verification - Create Token
//------------------------------
export const accountVerificationSendToken = createAsyncThunk(
  "accountVerification/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await baseAPI.post(
        `auth/generate-verify-email-token`,
        {},
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
// Account Verification
//------------------------------
export const verifyAccountAction = createAsyncThunk(
  "accountVerification/verify",
  async (token, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.users;
    const { userAuth } = users;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await baseAPI.patch(
        `auth/verify-account`,
        { token },
        config
      );

      dispatch(resetAccountVerification());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

const accountVerificationSlices = createSlice({
  name: "accountVerification",
  initialState: {},
  extraReducers: (builder) => {
    //------------------------------
    // Create Token
    //------------------------------
    builder.addCase(accountVerificationSendToken.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(accountVerificationSendToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(accountVerificationSendToken.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
    //------------------------------
    // Verify Account
    //------------------------------
    builder.addCase(verifyAccountAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetAccountVerification, (state, action) => {
      state.isVerified = true;
    });

    builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.verified = action?.payload;
      state.isVerified = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(verifyAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default accountVerificationSlices.reducer;
