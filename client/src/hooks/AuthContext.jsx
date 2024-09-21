// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import CheckAuth from './CheckAuth'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ authorized: false, loading: true });

  useEffect(() => {

    const fetchAuthStatus = async () => {
      const isAuthorized = await CheckAuth();
      setAuth({ authorized: isAuthorized, loading: false });
    };
    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
