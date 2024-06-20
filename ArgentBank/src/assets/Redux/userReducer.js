import { createSlice } from "@reduxjs/toolkit";

// Définition de l'état initial pour le reducer user
const initialState = {
  user: null, // Données de l'utilisateur
  token: null, // Jeton d'authentification
  isLoading: false, // Indicateur de chargement
  error: null, // Message d'erreur
};

// Création du slice pour le reducer user
const userSlice = createSlice({
  name: "user",
  initialState, 
  reducers: {
    startRequest: (state) => { // Reducer pour indiquer le début d'une requête
      state.isLoading = true; // Passage du chargement à true
      state.error = null; // Effacement de l'erreur
    },
    loginSuccess: (state, action) => { // Reducer pour gérer une connexion réussie
      state.isLoading = false; // Fin du chargement
      state.user = action.payload.user; // Mise à jour des données de l'utilisateur
      state.token = action.payload.token; // Mise à jour du jeton d'authentification
    },
    loginFailure: (state, action) => { // Reducer pour gérer une connexion échouée
      state.isLoading = false; // Fin du chargement
      state.error = action.payload.error; // Mise à jour du message d'erreur
    },
    getProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    getProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    updateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    logout: (state) => { // Reducer pour gérer la déconnexion
      state.isLoading = false;
      state.user = null; // Réinitialisation des données de l'utilisateur
      state.token = null; // Réinitialisation du jeton d'authentification
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
    },
  },
});

// Extraction des actions générées par le slice user
export const {
  startRequest,
  loginSuccess,
  loginFailure,
  getProfileSuccess,
  getProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
