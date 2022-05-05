import React from "react";

import "./header.scss";
import logo from "../../assets/img/132_generated.jpg";
import { NavLink } from "react-router-dom";
import Nav from "../Navigation/Nav";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <NavLink to="/">
          <img src={logo} alt="logo" className="logo-img" />
        </NavLink>
      </div>

      {/* <div className="logo-container">
        <img
          src={logo}
          alt="Logo Header"
          className="logo-img"
          onClick={() => navigate("/")}
        />
      </div> */}
      <Nav />
    </div>
  );
};

export default Header;
