import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { passwordResetAction } from "../../../redux/slices/users/usersSlices";
import "./resetPassword.scss";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(passwordResetAction(data?.email));
  };
  return (
    <div className="reset-password">
      <div className="reset-password__container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="reset-password__container__form"
        >
          <h1>Reset Password</h1>
          <div className="reset-password__container__form__text__container">
            <label>Email</label>
            <input
              name="email"
              ref={register}
              {...register("email", {
                required: "Please enter your email.",
              })}
              type="email"
            />
          </div>
          <button
            className="reset-password__container__form__button"
            type="submit"
          >
            Submit
          </button>
          {errors.email && (
            <span className="error-required-field">
              This field is required.
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
