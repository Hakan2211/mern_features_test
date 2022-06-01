import React, { useEffect } from "react";
import "./postList.scss";
import { MdAddCircle } from "react-icons/md";
import { fetchPostsAction } from "../../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostCard from "./PostCard/PostCard";
import Spinner from "../../../components/Spinner/Spinner";

const PostList = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state?.posts);

  const { postLists, loading, appError, serverError, likes } = post;

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch, likes]);
  return (
    <div className="post-list">
      <Link className="post-list__cta__add" to="/create-post">
        <MdAddCircle className="post-list__cta__add__icon" />
        <span className="post-list__cta__add__text">Post hinzufügen</span>
      </Link>
      {loading ? (
        <Spinner />
      ) : appError || serverError ? (
        <h1>Error</h1>
      ) : postLists?.length <= 0 ? (
        <h1 className="post-list__title-not-found">Keine Posts gefunden</h1>
      ) : (
        <div className="post-list__container">
          {postLists?.map((post) => (
            <PostCard
              profilePicture={post?.user?.profilePicture}
              key={post?._id}
              post={post}
              comments={post?.comments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
