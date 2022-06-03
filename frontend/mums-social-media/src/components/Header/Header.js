import React from "react";

import "./header.scss";
import logo from "../../assets/img/fundavoll_logo.svg";
import { NavLink } from "react-router-dom";
import Nav from "../Navigation/Nav";
import Auth from "../Navigation/Auth/Auth";
import MobileNavigation from "../Navigation/MobileNavigation/MobileNavigation";

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
      <MobileNavigation />
    </div>
  );
};

export default Header;
