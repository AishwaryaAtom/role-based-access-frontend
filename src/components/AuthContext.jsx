import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (authToken) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/api/auth/me`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          setUser(response.data);
        } catch (error) {
          setAuthToken(null);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    checkToken();
  }, [authToken, navigate]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      setAuthToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/profile");
      return null; // No error
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return error.response.data.message;
      }
      return "Something went wrong";
    }
  };

  const register = async (email, password, role) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/register`,
        {
          email,
          password,
          role,
        }
      );
      setUser(response.data.user);
      setAuthToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/profile");
      return null; // Registration successful, no error message
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data.message; // Return the error message from the API response
      } else {
        return "An unexpected error occurred";
      }
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
