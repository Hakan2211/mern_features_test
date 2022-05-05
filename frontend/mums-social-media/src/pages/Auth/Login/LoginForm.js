import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const LoginForm = ({ onSubmit }) => {
  const usersData = useSelector((state) => state.users);
  const { appError, serverError, loading } = usersData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="login">
      <h1>Login to your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <div className="text__container">
          <label>Email</label>
          <input
            name="email"
            ref={register}
            {...register("email", { required: "Please enter your email." })}
            type="email"
          />
        </div>
        {errors.email && (
          <span className="error-required-field">This field is required.</span>
        )}
        <div className="text__container">
          <label>Password</label>
          <input
            name="password"
            ref={register}
            {...register("password", { required: true })}
            type="password"
          />
        </div>
        {errors.email && (
          <span className="error-required-field">This field is required.</span>
        )}
        {loading ? (
          <button type="disabled">Loading...</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>

      {appError || serverError ? (
        <div>
          {serverError} - {appError}
        </div>
      ) : null}
    </div>
  );
};
export default LoginForm;
