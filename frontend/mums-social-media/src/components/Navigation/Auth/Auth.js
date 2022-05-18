import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./auth.scss";

const Auth = () => {
  const user = useSelector((state) => state.users);
  const { userAuth, registered } = user;
  return (
    <div className="nav-auth">
      {!userAuth && !registered ? (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/login"
          >
            Login
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/register"
          >
            Register
          </NavLink>
        </>
      ) : (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/logout"
        >
          Logout
        </NavLink>
      )}
    </div>
  );
};

export default Auth;
