import React from "react";
import "./nav.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const userData = useSelector((state) => state.users);
  const { userAuth, registered } = userData;
  console.log(userAuth, registered);

  return (
    <div className="nav">
      <div className="nav-links">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/gallery"
        >
          Gallery
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/add-category"
        >
          Add Category
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/create-post"
        >
          Create Post
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/category-list"
        >
          Categories
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/posts"
        >
          Posts
        </NavLink>
      </div>

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

      {/* <NavLink
        className={({ isActive }) => (isActive ? "active" : "inactive")}
        to="/logout"
      >
        Logout
      </NavLink> */}
    </div>
  );
};

export default Nav;
