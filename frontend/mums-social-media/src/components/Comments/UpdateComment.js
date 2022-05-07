import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCommentAction,
  updateCommentAction,
} from "../../redux/slices/comments/commentSlices";
import "./addComment.scss";

const UpdateComment = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const comment = useSelector((state) => state.comments);
  const { commentDetails, isUpdated } = comment;

  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [dispatch, id]);

  if (isUpdated) {
    navigate(-1);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { description: commentDetails?.description },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const payload = {
      id,
      description: data.description,
    };
    dispatch(updateCommentAction(payload));
  };
  return (
    <div className="create-post">
      <h1>Update Comment</h1>
      <form className="create-post__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text__container">
          <label>Update Comment</label>
          <input
            name="description"
            ref={register}
            {...register("description", {
              required: "Please enter a comment.",
            })}
            type="text"
          />
        </div>
        {errors.title && (
          <span className="error-required-field">This field is required.</span>
        )}
        <button type="submit" className="create-post__button">
          Update Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateComment;
