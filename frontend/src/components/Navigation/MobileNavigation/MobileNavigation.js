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

  const navList = [
    { name: "Home", link: "/" },
    { name: "Galerie", link: "/posts" },
    { name: "Kategorie", link: "category-list" },
  ];

  return (
    <div className="mobile-navigation">
      {open ? CloseIcon : HamburgerIcon}
      {open && (
        <nav className="mobile-navigation__container">
          <ul className="mobile-navigation__list">
            {navList.map((listItem) => (
              <li className="mobile-navigation__list--item">
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "mobile-navigation__list--item-active"
                      : "mobile-navigation__list--item-inactive"
                  }
                  to={listItem.link}
                >
                  {listItem.name}
                </NavLink>
              </li>
            ))}
          </ul>
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
        </nav>
      )}
    </div>
  );
};

export default MobileNavigation;
