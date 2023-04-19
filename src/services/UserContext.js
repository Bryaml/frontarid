import { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {}
});

export const UserProvider = ({ children }) => {
  const authService = new AuthService();
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserContext;
