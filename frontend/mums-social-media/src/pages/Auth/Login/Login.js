import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import "./login.scss";
import LoginForm from "./LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const { isLogged } = user;

  const onSubmit = async (data) => {
    dispatch(loginUserAction(data));
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/profile");
    }
  }, [isLogged]);

  return (
    <div className="login">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
