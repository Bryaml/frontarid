import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import UserContext from './services/UserContext';

import AppRoutes from "./AppRoutes";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService, { isAuthenticated, loadUser } from './services/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState(loadUser());

  return (
     <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;



