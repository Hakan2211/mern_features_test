import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { passwordResetTokenAction } from "../../../redux/slices/users/usersSlices";

const ResetPasswordToken = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state?.users);
  const { passwordResetToken } = user;

  useEffect(() => {
    setTimeout(() => {
      if (passwordResetToken) {
        navigate("/login");
      }
    }, 5000);
  }, [passwordResetToken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      password: data?.password,
      token: id,
    };
    console.log(payload);
    dispatch(passwordResetTokenAction(payload));
  };

  return (
    <div className="update-password">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <div className="text__container">
          <label>Password</label>
          <input
            name="password"
            ref={register}
            {...register("password", {
              required: "Please enter your new password.",
            })}
            type="password"
          />
        </div>
        <button type="submit">Submit</button>
        {errors.password && (
          <span className="error-required-field">This field is required.</span>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordToken;
