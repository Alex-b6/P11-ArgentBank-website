import React from 'react';
import { NavLink } from 'react-router-dom';

const GuestLinks = () => (
  <NavLink to="/login" className="main-nav-item">
    <i className="fa fa-user-circle"></i>
    Sign In
  </NavLink>
);

export default GuestLinks;
