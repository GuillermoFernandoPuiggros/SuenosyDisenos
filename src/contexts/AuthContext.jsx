import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (username) => {
    const token = `fake-token-${username}`;
    if (username == "administrador@gmail.com") {
      setAdmin(true); //contraseña 2871SyD
    }
    localStorage.setItem("authToken", token);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setAdmin(false);
  };

  const verificationLog = () => {
    const userToken = localStorage.getItem("authToken");
    if (userToken) {
      const username = userToken.replace("fake-token-", "");
      if (username === "administrador@gmail.com") {
        setAdmin(true);
      }
      setUser(username);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, admin, verificationLog }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthContext = () => useContext(AuthContext);
