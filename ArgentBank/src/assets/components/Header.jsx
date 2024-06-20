import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/userReducer';
import Logo from './Logo';
import UserLinks from './UserLinks';
import GuestLinks from './GuestLinks';

import '../styles/components/header.scss';

const Header = () => {
  const dispatch = useDispatch();
  // Utilisation du hook useSelector pour accéder à l'état global Redux, notamment le token et les informations utilisateur
  const { token, user } = useSelector(state => state.user);
  // Fonction de gestion de la déconnexion
  const handleLogout = () => {
      dispatch(logout());
      /*console.log(logout())*/
  }

  return (
    <nav className="main-nav">
    <Logo />
    <div className="main-nav-items">
      {token ? (
        <UserLinks userName={user?.userName} handleLogout={handleLogout} />
      ) : (
        <GuestLinks />
      )}
    </div>
  </nav>
);
};

export default Header;
