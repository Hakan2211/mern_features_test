import React from "react";

import "./header.scss";
import logo from "../../assets/img/132_generated.jpg";
import { NavLink } from "react-router-dom";
import Nav from "../Navigation/Nav";
import Auth from "../Navigation/Auth/Auth";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <NavLink to="/">
          <img src={logo} alt="logo" className="logo-img" />
        </NavLink>
      </div>
      <Nav />
      <Auth />
    </div>
  );
};

export default Header;
