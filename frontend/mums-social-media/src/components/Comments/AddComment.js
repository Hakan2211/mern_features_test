import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";
import "./addComment.scss";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const payload = {
      postId,
      description: data.description,
    };
    dispatch(createCommentAction(payload));
  };
  return (
    <div className="create-post">
      <h1>Add Comment</h1>
      <form className="create-post__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text__container">
          <label>comment</label>
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
          Send Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
