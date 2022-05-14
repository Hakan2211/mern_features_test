import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { passwordResetAction } from "../../../redux/slices/users/usersSlices";

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
    <div className="update-password">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <div className="text__container">
          <label>email</label>
          <input
            name="email"
            ref={register}
            {...register("email", {
              required: "Please enter your email.",
            })}
            type="email"
          />
        </div>
        <button type="submit">Submit</button>
        {errors.email && (
          <span className="error-required-field">This field is required.</span>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
