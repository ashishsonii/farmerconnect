import React, { createContext, useState, useEffect } from "react";
import { signupUser, loginUser } from "../api/Auth"; // your API calls

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Keep localStorage in sync
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const signup = async (data) => {
    const res = await signupUser(data);
    if (res.token) {
      setToken(res.token);
      setUser(res.user); // store user object
    }
    return res;
  };

  const login = async (data) => {
    const res = await loginUser(data);
    if (res.token) {
      setToken(res.token);
      setUser(res.user); // store user object
    }
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
