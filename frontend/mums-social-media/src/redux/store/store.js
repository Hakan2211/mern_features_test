import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/categories/categoriesSlices";
import postsReducer from "../slices/posts/postSlices";
import commentReducer from "../slices/comments/commentSlices";
import emailReducer from "../slices/email/emailSlices";
import accountVerificationReducer from "../slices/accountVerification/accountVerificationSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
    posts: postsReducer,
    comments: commentReducer,
    email: emailReducer,
    accountVerification: accountVerificationReducer,
  },
});

export default store;
