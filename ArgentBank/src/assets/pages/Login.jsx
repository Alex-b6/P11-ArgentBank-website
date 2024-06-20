import '../styles/pages/login.scss';
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startRequest, loginSuccess, loginFailure } from '../Redux/userReducer';

const Login = () => {
  const dispatch = useDispatch();// Utilisation du hook useDispatch pour obtenir la méthode de dispatch Redux
  const navigate = useNavigate();// Utilisation du hook useNavigate pour naviguer entre les pages
  const error = useSelector(state => state.user.error);// Utilisation du hook useSelector pour accéder à l'état global Redux, notamment l'erreur d'authentification
  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
      event.preventDefault();// Empêche le rechargement de la page lors de la soumission du formulaire
      dispatch(startRequest());// Déclenche l'action de début de requête

      // Récupération des valeurs des champs email et mot de passe
      const email = event.target.elements.email.value;
      const password = event.target.elements.password.value;

      try {
          const response = await axios.post('http://localhost:3001/api/v1/user/login', {
              email: email,
              password: password
          });

          const data = response.data;// Récupération des données de la réponse
          /*console.log('API Response:', data);*/ // test réponse API
          if (data.body && data.body.token) {// Vérification de la présence du token
              sessionStorage.setItem('token', data.body.token);
              /*console.log('Token stored in sessionStorage:', sessionStorage.getItem('token'));*/ // test Token
              dispatch(loginSuccess({
                  user: { email: email },
                  token: data.body.token
              }));

              navigate('/profile');// Redirection vers la page de profil
          } else {
              dispatch(loginFailure({ error: 'Login failed.' }));
          }
      } catch (error) {
          /*console.error('Login Error:', error);*/ // test erreur login
          dispatch(loginFailure({ error: 'Login failed. Please check your email and password and try again.' }));
      }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </section>
    </main>
  );
};

export default Login;
