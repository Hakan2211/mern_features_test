import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostDetailAction } from "../../../../redux/slices/posts/postSlices";
import "./postDetail.scss";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailAction(id));
  }, [dispatch, id]);
  console.log(id);

  return (
    <>
      <div className="post__detail">
        <div className="post__detail__content">
          <div className="post__detail__content__container">
            <img
              src="https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_960_720.jpg"
              alt=""
              className="post__detail__content__container__image"
            />
          </div>
          <div className="post__detail__content__header">
            <div className="post__detail__content__header__userinfo">
              UserInfo
            </div>
            <div className="post__detail__content__header__options">
              Delete and Update
            </div>
            <div className="post__detail__content__header__date"> Time</div>
          </div>
          <div className="post__detail__content__header__text">
            <div className="post__detail__content__header__text__title">
              Title
            </div>
            <div className="post__detail__content__header__text__description">
              Description
            </div>
          </div>
        </div>
        <div className="post__detail__comment">Comment</div>
      </div>
    </>
  );
};

export default PostDetail;
