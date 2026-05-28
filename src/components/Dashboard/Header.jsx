import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const Header = ({ toggle }) => {
  return (
    <div className="admin-header">
      <Bars3Icon className="menu-icon" onClick={toggle} />

      <NavLink to={'/'} className="admin-link">
        <span>Home</span>
      </NavLink>
    </div>
  );
};

export default Header;