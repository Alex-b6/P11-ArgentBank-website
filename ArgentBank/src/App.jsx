// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import Profile from "./assets/pages/Profile";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import PrivateRoute from "./assets/components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<PrivateRoute element={Profile} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
