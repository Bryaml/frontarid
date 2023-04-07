import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  setAuthState: () => {},
});

export default AuthContext;
