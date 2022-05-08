import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deletePostAction,
  fetchPostDetailAction,
} from "../../../../redux/slices/posts/postSlices";
import "./postDetail.scss";
import DateFormatter from "../../../../utils/DateFormatter";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import AddComment from "../../../../components/Comments/AddComment";
import CommentList from "../../../../components/Comments/CommentList";

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
  console.log(isCreatedBy);
  useEffect(() => {
    dispatch(fetchPostDetailAction(id));
  }, [dispatch, id, commentCreated, commentDeleted]);

  if (isDeleted) {
    navigate("/posts", { replace: true });
  }

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

              {isCreatedBy ? (
                <div className="post__detail__content__header__options">
                  <Link to={`/update-post/${postDetail?.id}`}>
                    <MdOutlineModeEditOutline />
                  </Link>

                  <MdDelete
                    onClick={() => dispatch(deletePostAction(postDetail?.id))}
                  />
                </div>
              ) : null}

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
          <div className="post__detail__comment">
            {userAuth ? <AddComment postId={id} /> : null}

            <CommentList comments={postDetail?.comments} />
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
