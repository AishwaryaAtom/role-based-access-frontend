import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import { AuthProvider } from "./context/Authcontext.js";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
  </React.StrictMode>
);
