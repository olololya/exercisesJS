import React from 'react';
import { Link } from 'react-router';

const NavLink = props => (
  <Link {...props} className="link" activeClassName="active-link" />
);

export default NavLink;
