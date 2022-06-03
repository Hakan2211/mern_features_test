import React from "react";
import "./commentList.scss";
import Moment from "react-moment";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  const isLoginUser = userAuth?._id;

  return (
    <div className="comment__list">
      {/* <div>{comments?.length} Comments</div> */}

      <div className="comment__list__container">
        {comments?.length <= 0 ? (
          <h1 className="comment__list__container__no-comments">
            Noch keine Kommentare
          </h1>
        ) : (
          comments?.map((comment) => (
            <div className="comment__list__container__item" key={comment?._id}>
              <div className="comment__list__container__item__userinfo">
                <div className="comment__list__container__item__userinfo__image-container">
                  <img
                    src={comment?.user?.profilePicture}
                    alt="profilePicture"
                  />
                </div>
                <div className="comment__list__container__item__userinfo__right">
                  <div className="comment__list__container__item__userinfo__right__name">
                    {comment?.user?.name}
                  </div>
                  <div className="comment__list__container__item__userinfo__right__date">
                    <Moment fromNow ago>
                      {comment?.createdAt}
                    </Moment>
                  </div>
                </div>
              </div>
              <div className="comment__list__container__item__content">
                <div className="comment__list__container__item__content__options">
                  {isLoginUser === comment?.user?._id ? (
                    <>
                      <Link to={`/update-comment/${comment._id}`}>
                        <MdOutlineModeEditOutline className="comment__list__container__item__content__options__update-icon" />
                      </Link>
                      <MdDelete
                        onClick={() =>
                          dispatch(deleteCommentAction(comment?._id))
                        }
                        className="comment__list__container__item__content__options__delete-icon"
                      />
                    </>
                  ) : null}
                </div>
                <div className="comment__list__container__item__content__comment">
                  {comment?.description}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
