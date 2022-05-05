import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostDetailAction } from "../../../../redux/slices/posts/postSlices";
import "./postDetail.scss";
import DateFormatter from "../../../../utils/DateFormatter";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts);
  const { postDetail, loading, appError, serverError } = post;

  useEffect(() => {
    dispatch(fetchPostDetailAction(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : appError || serverError ? (
        <h1>
          {serverError} - {appError}
        </h1>
      ) : (
        <div className="post__detail">
          <div className="post__detail__content">
            <div className="post__detail__content__container">
              <img
                src={postDetail?.image}
                alt=""
                className="post__detail__content__container__image"
              />
            </div>
            <div className="post__detail__content__header">
              <div className="post__detail__content__header__userinfo">
                {postDetail?.user?.name}
              </div>
              <div className="post__detail__content__header__options">
                Delete and Update
              </div>
              <div className="post__detail__content__header__date">
                <DateFormatter date={postDetail?.createdAt} />
              </div>
            </div>
            <div className="post__detail__content__header__text">
              <div className="post__detail__content__header__text__title">
                {postDetail?.title}
              </div>
              <div className="post__detail__content__header__text__description">
                {postDetail?.description}
              </div>
            </div>
          </div>
          <div className="post__detail__comment">Comment</div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
