// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useAuth } from "../context/Authcontext";

// const ProtectedRoute = ({ component: Component, role, ...rest }) => {
//   const { state } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         state.user && state.user.role === role ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Adjust the path as needed

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user, authToken } = useContext(AuthContext);

  return authToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
