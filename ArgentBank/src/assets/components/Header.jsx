import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/userReducer';

import '../styles/components/header.scss';

const Header = () => {
  const dispatch = useDispatch();

  const { token, user } = useSelector(state => state.user);

  const handleLogout = () => {
      dispatch(logout());
      console.log(logout())
  }

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-items">
      {token ?
          <>
            <NavLink to="/Profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </NavLink>
            <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
         : 
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
      }
      </div>
    </nav>
  );
};

export default Header;
