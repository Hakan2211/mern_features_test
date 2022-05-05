import React from "react";
import "./register.scss";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const RegisterForm = ({ onSubmit }) => {
  // Select Data from Redux Store
  const usersData = useSelector((store) => store.users);
  const { appError, serverError, loading } = usersData;

  //React-Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="register">
      <h1>Register an Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <div className="text__container">
          <label>Name</label>
          <input
            name="name"
            ref={register}
            {...register("name", { required: "Please enter your name." })}
            type="text"
          />
        </div>
        {errors.name && (
          <span className="error-required-field">This field is required.</span>
        )}
        <div className="text__container">
          <label>Email</label>
          <input
            name="email"
            ref={register}
            {...register("email", { required: true })}
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
        {errors.password && (
          <span className="error-required-field">This field is required.</span>
        )}

        {/* Checking if loading */}
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

export default RegisterForm;
