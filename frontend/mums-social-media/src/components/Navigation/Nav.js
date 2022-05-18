import React from "react";
import "./nav.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
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
    </div>
  );
};

export default Nav;
