// // src/context/AuthContext.js
// import React, { createContext, useReducer, useContext } from "react";

// const AuthContext = createContext();

// const initialState = {
//   user: null,
//   token: null,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.token,
//       };
//     case "LOGOUT":
//       return { ...state, user: null, token: null };
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
