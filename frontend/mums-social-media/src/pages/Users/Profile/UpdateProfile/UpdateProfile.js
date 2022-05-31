import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserDetailAction,
  updateUserAction,
} from "../../../../redux/slices/users/usersSlices";
import "./updateProfile.scss";

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
    <div className="update-profile">
      <div className="update-profile__container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="update-profile__container__form"
        >
          <h1>Update your Profile</h1>
          <div className="update-profile__container__form__text__container">
            <label>Name</label>
            <input
              name="name"
              ref={register}
              {...register("name")}
              type="text"
            />
          </div>

          <div className="update-profile__container__form__text__container">
            <label>Email</label>
            <input
              name="email"
              ref={register}
              {...register("email")}
              type="email"
            />
          </div>

          <div className="update-profile__container__form__bio__container">
            <label>Bio</label>
            <input
              name="bio"
              ref={register}
              {...register("bio")}
              type="textarea"
            />
          </div>

          <button
            className="update-profile__container__form__button"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
