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
        <h1 className="add__comment__container__form__title">
          Kommentar hinzufügen
        </h1>
        <div className="add__comment__container__form__text-container">
          <label>Kommentar</label>
          <textarea
            name="description"
            ref={register}
            {...register("description", {
              required: "Please enter a comment.",
            })}
            cols="40"
            rows="5"
          />
        </div>
        {errors.title && (
          <span className="error-required-field">This field is required.</span>
        )}
        <button type="submit" className="add__comment__container__form__button">
          Kommentar senden
        </button>
      </form>
    </div>
  );
};

export default AddComment;
