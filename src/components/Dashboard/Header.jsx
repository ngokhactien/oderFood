import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = ({ toggle }) => {
  return (
    <div className="admin-header">
      <Bars3Icon className="menu-icon" onClick={toggle} />

      <div className="admin-right">
        <div className="avatar"></div>
        <span>ADMIN</span>
      </div>
    </div>
  );
};

export default Header;