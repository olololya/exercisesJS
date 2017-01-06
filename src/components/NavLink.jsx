import React from 'react';
import { Link, IndexLink } from 'react-router';

export const NavLink = props => (
  <Link {...props} className="link" activeClassName="active-link" />
);

export const NavIndexLink = props => (
  <IndexLink {...props} className="link" activeClassName="active-link" />
);
