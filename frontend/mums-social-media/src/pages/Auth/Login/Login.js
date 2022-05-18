import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import "./login.scss";
import LoginForm from "./LoginForm";

const Login = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  const onSubmit = async (data) => {
    dispatch(loginUserAction(data));
  };

  if (userAuth) return <Navigate to={`/profile/${userAuth?._id}`} />;

  return (
    <div className="login">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
