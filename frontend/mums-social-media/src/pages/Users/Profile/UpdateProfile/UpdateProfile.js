import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserDetailAction,
  updateUserAction,
} from "../../../../redux/slices/users/usersSlices";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const { userDetails, userIsUpdated, loading, appError, serverError } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userDetails?.name,
      email: userDetails?.email,
      bio: userDetails?.bio,
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(updateUserAction(data));
  };

  useEffect(() => {
    dispatch(fetchUserDetailAction(id));
  }, [dispatch, id]);

  if (userIsUpdated) {
    navigate(`/profile/${id}`);
  }

  return (
    <div className="register">
      <h1>Upload your Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <div className="text__container">
          <label>Name</label>
          <input name="name" ref={register} {...register("name")} type="text" />
        </div>

        <div className="text__container">
          <label>Email</label>
          <input
            name="email"
            ref={register}
            {...register("email")}
            type="email"
          />
        </div>

        <div className="text__container">
          <label>Bio</label>
          <input
            name="bio"
            ref={register}
            {...register("bio")}
            type="textarea"
          />
        </div>

        {/* <div className="text__container">
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
        )} */}

        {/* Checking if loading */}
        {/* {loading ? (
          <button type="disabled">Loading...</button>
        ) : (
          <button type="submit">Submit</button>
        )} */}
        <button type="submit">Update Profile</button>
      </form>

      {/* {appError || serverError ? (
        <div>
          {serverError} - {appError}
        </div>
      ) : null} */}
    </div>
  );
};

export default UpdateProfile;
