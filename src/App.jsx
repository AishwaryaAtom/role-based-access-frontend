import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./auth/register.jsx";
import LoginForm from "./auth/Login.jsx";
import ProtectedRoute from "./components/ProctectedRoute";
import { AuthProvider } from "./components/AuthContext.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import "./style.css";

const App = () => (
  // <Router>
  //   <Routes>
  //     <Route path="/" element={<RegistrationForm />} />
  //     <Route path="/login" element={<LoginForm />} />
  //   </Routes>
  // </Router>

  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
