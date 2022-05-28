import React from "react";
import "./postCard.scss";

import { ImHeart, ImBubble } from "react-icons/im";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleLikePostAction } from "../../../../redux/slices/posts/postSlices";
import DateFormatter from "../../../../utils/DateFormatter";

const PostCard = ({ post, profilePicture }) => {
  const dispatch = useDispatch();

  return (
    <div key={post?._id} className="post-list__card">
      <div className="post-list__card__header">
        <div className="post-list__card__header__userinfo">
          <div className="post-list__card__header__userinfo__image-container">
            <Link to={`/profile/${post?.user?._id}`}>
              <img
                src={profilePicture}
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
            {post?.likes?.length} Likes
          </span>
        </div>
      </div>
      <div className="post-list__card__image-container">
        <Link to={`/posts/${post?._id}`}>
          <img src={post?.image} className="post-list__image" alt="post" />
        </Link>
      </div>
      <div className="post-list__card__description">
        <div className="post-list__card__description__header">
          <h3 className="post-list__card__description__title">{post?.title}</h3>
          <p className="post-list__card__description__category">
            <span>{post?.category}</span>
          </p>
        </div>

        <p className="post-list__card__description__subtext">
          {post?.description.slice(0, 80)} ...
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
          {post?.comments.length === 0 ? (
            <span>Noch keine Kommentare</span>
          ) : post?.comments.length === 1 ? (
            <span>1 Kommentar</span>
          ) : (
            <span>{post?.comments.length} Kommentare</span>
          )}
        </div>

        <div className="post-list__card__info__views">
          <AiOutlineEye className="post-list__card__info__views__icon" />
          <span>{post?.numViews ? post?.numViews : 0} Views </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
