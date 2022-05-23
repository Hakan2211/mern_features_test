import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePasswordAction } from "../../../redux/slices/users/usersSlices";
import "./updatePassword.scss";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users);
  const { passwordIsUpdated, userAuth } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updatePasswordAction(data?.password));
  };

  if (passwordIsUpdated) {
    navigate(`/profile/${userAuth?._id}`);
  }
  return (
    <div className="update-password">
      <div className="update-password__container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="update-password__container__form"
        >
          <h1>Update Password</h1>
          <div className="update-password__container__form__text__container">
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
          <button
            className="update-password__container__form__button"
            type="submit"
          >
            Submit
          </button>
          {errors.password && (
            <span className="error-required-field">
              This field is required.
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
