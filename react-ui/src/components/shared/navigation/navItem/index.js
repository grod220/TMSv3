import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ children, path, action }) => (
  <li>
    <Link to={path} onClick={action}>
      {children}
    </Link>
  </li>
);

NavItem.propTypes = {};

export default NavItem;
