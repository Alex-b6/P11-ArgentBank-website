import React from 'react';
import { NavLink } from 'react-router-dom';

const UserLinks = ({ userName, handleLogout }) => (
  <>
    <NavLink to="/Profile" className="main-nav-item">
      <i className="fa fa-user-circle"></i>
      {userName}
    </NavLink>
    <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
      <i className="fa fa-sign-out"></i>
      Sign Out
    </NavLink>
  </>
);

export default UserLinks;
