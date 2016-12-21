import React from 'react';
import { NavLink, NavIndexLink } from './NavLink';
import '../stylesheet/header.scss';

const Header = () => (
  <div className="header">
    <div className="logo">PropertyCross</div>
    <div className="navbar">
      <NavIndexLink to="/">Home</NavIndexLink>
      <NavLink to="/faves">Faves</NavLink>
      <NavLink to="/search">Search</NavLink>
    </div>
  </div>
);

export default Header;
