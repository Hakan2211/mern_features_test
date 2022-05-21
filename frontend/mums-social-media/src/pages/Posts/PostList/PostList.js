import React, { useEffect } from "react";
import "./postList.scss";
import { MdAddCircle } from "react-icons/md";
import { fetchPostsAction } from "../../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostCard from "./PostCard/PostCard";

const PostList = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state?.posts);

  const { postLists, loading, appError, serverError, likes } = post;
  console.log(post, "post for like");

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch, likes]);
  return (
    <div className="post-list">
      <Link className="post-list__cta__add" to="/create-post">
        <MdAddCircle className="post-list__cta__add__icon" />
        <span className="post-list__cta__add__text">Add Post</span>
      </Link>
      {appError || serverError ? (
        <h1>Error</h1>
      ) : postLists?.length <= 0 ? (
        <h1>No post found</h1>
      ) : (
        <div className="post-list__container">
          {postLists?.map((post) => (
            <PostCard key={post?._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
