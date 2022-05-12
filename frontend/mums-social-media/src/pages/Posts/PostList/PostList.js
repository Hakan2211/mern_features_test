import React, { useEffect } from "react";
import { ImHeart, ImBubble } from "react-icons/im";
import { AiOutlineEye } from "react-icons/ai";
import "./postList.scss";
import { HiOutlineArrowRight } from "react-icons/hi";

import {
  fetchPostsAction,
  toggleLikePostAction,
} from "../../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../../utils/DateFormatter";
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state?.posts);

  const { postLists, loading, appError, serverError, likes } = post;
  console.log(post, "post for like");

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch, likes]);
  return (
    <>
      {appError || serverError ? (
        <h1>Error</h1>
      ) : postLists?.length <= 0 ? (
        <h1>No post found</h1>
      ) : (
        postLists?.map((post) => (
          <div key={post.id} className="post-list__card">
            <div className="post-list__card__header">
              <Link to={`/profile/${post?.user?._id}`}>
                <div className="post-list__card__header__userinfo">
                  <div className="post-list__card__header__userinfo__image-container">
                    <img
                      src={post?.user?.profilePicture}
                      className="post-list__card__header__userinfo__image-container__image"
                      alt="post user"
                    />
                  </div>
                  <div className="post-list__card__header__userinfo__right">
                    <p className="post-list__card__header__userinfo__name">
                      {post?.user?.name}
                    </p>
                    <DateFormatter date={post?.createdAt} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="post-list__card__image-container">
              <img src={post?.image} className="post-list__image" alt="post" />
            </div>
            <div className="post-list__card__description">
              <p className="post-list__card__description__category">
                <span>{post?.category}</span>
              </p>
              <h3 className="post-list__card__description__title">
                {post?.title}
              </h3>
              <p className="post-list__card__description__subtext">
                {post?.description}
              </p>
              <div className="post-list__card__description__link">
                <Link
                  to={`/posts/${post?._id}`}
                  className="post-list__card__description__link__text"
                >
                  Read More
                </Link>
                <HiOutlineArrowRight className="post-list__card__description__link__icon" />
              </div>
            </div>
            <div className="post-list__card__info">
              <div className="post-list__card__info__comments">
                <ImBubble />
                <span>200 Comments</span>
              </div>
              <div className="post-list__card__info__likes">
                <ImHeart
                  onClick={() => dispatch(toggleLikePostAction(post?._id))}
                />
                <span>{post?.likes.length} Likes </span>
              </div>
              <div className="post-list__card__info__views">
                <AiOutlineEye />
                <span>{post?.numViews ? post?.numViews : 0} Views </span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default PostList;
