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
    <div className="add__comment__container">
      <form
        className="add__comment__container__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="add__comment__container__form__title">Add Comment</h1>
        <div className="add__comment__container__form__text-container">
          <label>Comment</label>
          <input
            name="description"
            ref={register}
            {...register("description", {
              required: "Please enter a comment.",
            })}
            type="textarea"
          />
        </div>
        {errors.title && (
          <span className="error-required-field">This field is required.</span>
        )}
        <button type="submit" className="add__comment__container__form__button">
          Send Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
