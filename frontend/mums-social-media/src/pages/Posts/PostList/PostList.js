import React, { useEffect } from "react";
import { ImHeart, ImBubble } from "react-icons/im";
import { AiOutlineEye } from "react-icons/ai";
import "./postList.scss";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
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
            <div key={post.id} className="post-list__card">
              <div className="post-list__card__header">
                <div className="post-list__card__header__userinfo">
                  <div className="post-list__card__header__userinfo__image-container">
                    <Link to={`/profile/${post?.user?._id}`}>
                      <img
                        src={post?.user?.profilePicture}
                        className="post-list__card__header__userinfo__image-container__image"
                        alt="post user"
                      />
                    </Link>
                  </div>
                  <div className="post-list__card__header__userinfo__right">
                    <p className="post-list__card__header__userinfo__name">
                      {post?.user?.name}
                    </p>
                    <DateFormatter
                      date={post?.createdAt}
                      className="post-list__card__header__userinfo__date"
                    />
                  </div>
                </div>
                <div className="post-list__card__header__likes">
                  <ImHeart
                    className="post-list__card__header__likes__icon"
                    onClick={() => dispatch(toggleLikePostAction(post?._id))}
                  />
                  <span className="post-list__card__header__likes__text">
                    {post?.likes.length} Likes
                  </span>
                </div>
              </div>
              <div className="post-list__card__image-container">
                <Link to={`/posts/${post?._id}`}>
                  <img
                    src={post?.image}
                    className="post-list__image"
                    alt="post"
                  />
                </Link>
              </div>
              <div className="post-list__card__description">
                <div className="post-list__card__description__header">
                  <h3 className="post-list__card__description__title">
                    {post?.title}
                  </h3>
                  <p className="post-list__card__description__category">
                    <span>{post?.category}</span>
                  </p>
                </div>

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
              <div className="outline"></div>
              <div className="post-list__card__info">
                <div className="post-list__card__info__comments">
                  <ImBubble className="post-list__card__info__comments__icon" />
                  <span>200 Comments</span>
                </div>

                <div className="post-list__card__info__views">
                  <AiOutlineEye className="post-list__card__info__views__icon" />
                  <span>{post?.numViews ? post?.numViews : 0} Views </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
