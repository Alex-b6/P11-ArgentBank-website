import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  startRequest,
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
} from '../Redux/userReducer';
import '../styles/pages/profile.scss';

const Profile = () => {
  // Utilisation du hook useDispatch pour obtenir la méthode de dispatch Redux
  const dispatch = useDispatch();
  // Utilisation du hook useSelector pour accéder à l'état global de Redux
  const { user, isLoading, error, token } = useSelector(state => state.user);
  // Définition des états locaux avec useState
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  // Hook useEffect pour mettre à jour les champs de formulaire quand l'utilisateur change
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setUserName(user.userName || '');
    }
  }, [user]);
   // Hook useEffect pour récupérer les données utilisateur lors du montage du composant
  useEffect(() => {
    const fetchData = async () => {
      dispatch(startRequest());// Début de requête
      try {
        const response = await axios.post(
          'http://localhost:3001/api/v1/user/profile',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,// Envoi du token pour authentification
            },
          }
        );
        dispatch(getProfileSuccess({ user: response.data.body }));// Déclenchement de l'action de succès avec les données utilisateur
      } catch (error) {
        dispatch(getProfileFailure({ error: error.message }));// Déclenchement de l'action d'échec en cas d'erreur
      }
    };
    fetchData();// Appel de la fonction de récupération des données
  }, [dispatch, token]);
  // Gestion du clic sur le bouton d'édition
  const handleEditClick = () => {
    setIsEditing(true);// Activation du mode édition
  };
  // Gestion du clic sur le bouton de sauvegarde
  const handleSaveClick = async () => {
    setIsEditing(false);// Désactive le mode édition

    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
    };

    try {
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateProfileSuccess({ user: response.data.body }));
    } catch (error) {
      dispatch(getProfileFailure({ error: error.message }));
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-page">
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user && `${user.firstName} ${user.lastName} (${user.userName})`}!
          </h1>
          {isEditing ? (
            <div className='changeName'>
              <div className='positionInput'>
                <label htmlFor="firstName">Prénom :</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  readOnly //utilisation pour éviter la modification
                />
                <label htmlFor="lastName">Nom :</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  readOnly //utilisation pour éviter la modification
                />
                <label htmlFor="userName">Nom d'utilisateur :</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div className='PositionButton'>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <button onClick={handleEditClick} className="edit-button">
                Edit Username
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
