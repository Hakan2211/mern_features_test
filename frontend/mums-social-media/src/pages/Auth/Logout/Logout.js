import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../redux/slices/users/usersSlices";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutAction());
    navigate("/");
  }, [dispatch, navigate]);

  return <div>Logout</div>;
};

export default Logout;
