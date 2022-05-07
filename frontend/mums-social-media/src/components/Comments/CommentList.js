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
    <div>
      <ul>
        <div>{comments?.length} Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1>No Comments</h1>
          ) : (
            comments?.map((comment) => (
              <>
                <li key={comment?._id}>
                  {comment?.description}
                  <Moment fromNow ago>
                    {comment?.createdAt}
                  </Moment>
                  {isLoginUser === comment?.user?._id ? (
                    <>
                      <Link to={`/update-comment/${comment._id}`}>
                        <MdOutlineModeEditOutline />
                      </Link>
                      <MdDelete
                        onClick={() =>
                          dispatch(deleteCommentAction(comment?._id))
                        }
                      />
                    </>
                  ) : null}
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
};

export default CommentList;
