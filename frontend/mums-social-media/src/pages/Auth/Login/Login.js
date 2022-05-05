import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import "./login.scss";
import LoginForm from "./LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    dispatch(loginUserAction(data));

    navigate("/profile");
  };
  return (
    <div className="login">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
