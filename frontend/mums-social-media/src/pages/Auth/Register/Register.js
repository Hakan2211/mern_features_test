import React from "react";
import RegisterForm from "./RegisterForm";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  //Redirecting User after Registration
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(registerUserAction(data));

    navigate("/profile", { replace: true });
  };
  return (
    <div className="register">
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default Register;
