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
          to="/posts"
        >
          Galerie
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/category-list"
        >
          Kategorie
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
