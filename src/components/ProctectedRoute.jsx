import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Adjust the path as needed

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user, authToken } = useContext(AuthContext);

  return authToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
