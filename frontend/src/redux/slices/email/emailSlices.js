import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import baseAPI from "../../../apis/baseAPI";

//------------------------------
// Action for Redirect
//------------------------------

const resetEmailAction = createAction("mail/reset");

//------------------------------
// Update Post
//------------------------------
export const sendEmailAction = createAsyncThunk(
  "email/sendEmail",
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
        `email`,
        {
          to: email?.email,
          subject: email?.subject,
          message: email?.message,
          from: userAuth?.email,
        },
        config
      );

      dispatch(resetEmailAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

const emailSlices = createSlice({
  name: "email",
  initialState: {},
  extraReducers: (builder) => {
    //------------------------------
    // Create Posts
    //------------------------------
    builder.addCase(sendEmailAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetEmailAction, (state, action) => {
      state.isMailSent = true;
    });

    builder.addCase(sendEmailAction.fulfilled, (state, action) => {
      state.loading = false;
      state.emailMessage = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.isMailSent = false;
    });
    builder.addCase(sendEmailAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default emailSlices.reducer;
