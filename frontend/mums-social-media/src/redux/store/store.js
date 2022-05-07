import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/categories/categoriesSlices";
import postsReducer from "../slices/posts/postSlices";
import commentReducer from "../slices/comments/commentSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
    posts: postsReducer,
    comments: commentReducer,
  },
});

export default store;
