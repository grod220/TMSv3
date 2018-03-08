import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const NavItem = ({ children, path, action }) => (
  <li>
    <Link to={path} onClick={action}>
      {children}
    </Link>
  </li>
);

NavItem.propTypes = {
  path: PropTypes.string,
  action: PropTypes.func
};

export default NavItem;
