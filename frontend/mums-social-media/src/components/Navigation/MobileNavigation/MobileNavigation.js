import React, { useState } from "react";
import { CgMenu, CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./mobileNavigation.scss";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.users);
  const { userAuth, registered } = user;

  const HamburgerIcon = <CgMenu onClick={() => setOpen(!open)} />;
  const CloseIcon = <CgClose onClick={() => setOpen(!open)} />;
  return (
    <div className="mobile-navigation">
      {open ? CloseIcon : HamburgerIcon}
      {open && (
        <div className="mobile-navigation__container">
          <div classname="mobile-navigation__container__nav-options">
            <div>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/"
              >
                Home
              </NavLink>
            </div>

            <div>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/posts"
              >
                Gallerie
              </NavLink>
            </div>

            <div>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/category-list"
              >
                Kategorie
              </NavLink>
            </div>
          </div>
          <div className="mobile-navigation__container__nav-auth">
            {!userAuth && !registered ? (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                  to="/login"
                >
                  Login
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
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
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
