import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./login.scss";

const LoginForm = ({ onSubmit }) => {
  const usersData = useSelector((state) => state.users);
  const { appError, serverError, loading, userAuth } = usersData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="login__form__container">
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <h1>Login to your Account</h1>
        <div className="login__form__text__container">
          <label>Email</label>
          <input
            name="email"
            ref={register}
            {...register("email", { required: "Please enter your email." })}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <span className="error-required-field">This field is required.</span>
        )}
        <div className="login__form__text__container">
          <label>Password</label>
          <input
            name="password"
            ref={register}
            {...register("password", { required: true })}
            type="password"
            placeholder="Enter your password"
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
        <div className="reset-password">
          <Link to="/reset-password">Forgot your password? Click here.</Link>
        </div>
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
