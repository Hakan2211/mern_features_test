import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deletePostAction,
  fetchPostDetailAction,
} from "../../../../redux/slices/posts/postSlices";
import "./postDetail.scss";

import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import AddComment from "../../../../components/Comments/AddComment";
import CommentList from "../../../../components/Comments/CommentList";
import DateFormatter from "../../../../components/DateFormatter/DateFormatter";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state.posts);
  const { postDetail, loading, appError, serverError, isDeleted } = post;

  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  const comment = useSelector((state) => state.comments);
  const { commentCreated, commentDeleted } = comment;

  const isCreatedBy = postDetail?.user?._id === userAuth?._id;

  useEffect(() => {
    dispatch(fetchPostDetailAction(id));
  }, [dispatch, id, commentCreated, commentDeleted]);

  if (isDeleted) {
    navigate("/posts", { replace: true });
  }

  return (
    <div className="post__detail">
      {loading ? (
        <h1>Loading...</h1>
      ) : appError || serverError ? (
        <h1>
          {serverError} - {appError}
        </h1>
      ) : (
        <div className="post__detail__container">
          <div className="post__detail__container__content">
            <div className="post__detail__container__content__image-container">
              <img
                src={postDetail?.image}
                alt=""
                className="post__detail__container__content__image-container__image"
              />
            </div>
            <div className="post__detail__container__content__header__container">
              <div className="post__detail__container__content__header__container__header">
                <div className="post__detail__container__content__header__container__header__userinfo">
                  <div className="post__detail__container__content__header__container__header__userinfo__picture">
                    <img
                      src={postDetail?.user?.profilePicture}
                      alt="profilePicture"
                    />
                  </div>
                  <div className="post__detail__container__content__header__container__header__userinfo__right">
                    <div className="post__detail__container__content__header__container__header__userinfo__right__name">
                      {postDetail?.user?.name}
                    </div>
                    <div className="post__detail__container__content__header__container__header__userinfo__right__date">
                      <DateFormatter date={postDetail?.createdAt} />
                    </div>
                  </div>
                </div>
                <div className="post__detail__container__content__header__container__header__options">
                  {isCreatedBy ? (
                    <div className="post__detail__container__content__header__container__header__options__icons">
                      <Link to={`/update-post/${postDetail?.id}`}>
                        <MdOutlineModeEditOutline className="post__detail__container__content__header__container__header__options__icons__update-icon" />
                      </Link>

                      <MdDelete
                        onClick={() =>
                          dispatch(deletePostAction(postDetail?.id))
                        }
                        className="post__detail__container__content__header__container__header__options__icons__delete-icon"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="post__detail__container__content__header__container__header__text">
                <div className="post__detail__container__content__header__container__header__text__title">
                  {postDetail?.title}
                </div>
                <div className="post__detail__container__content__header__container__header__text__description">
                  {postDetail?.description}
                </div>
              </div>
            </div>
          </div>

          <div className="post__detail__container__comment">
            <div className="post__detail__container__comment__form">
              {userAuth ? <AddComment postId={id} /> : null}
            </div>
            <div className="post__detail__container__comment__list">
              <CommentList comments={postDetail?.comments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
