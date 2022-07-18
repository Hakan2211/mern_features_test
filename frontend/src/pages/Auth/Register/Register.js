import React, { useEffect } from "react";
import RegisterForm from "./RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const dispatch = useDispatch();

  //Redirecting User after Registration
  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const { isRegistered, userAuth } = user;

  const onSubmit = async (data) => {
    dispatch(registerUserAction(data));
  };

  useEffect(() => {
    if (isRegistered) {
      navigate(`/profile/${userAuth?._id}`);
    }
  }, [isRegistered]);

  return (
    <div className="register">
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default Register;
