import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function Profile() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1 className="text-center">My PROFILE</h1>
        {users?.role == "admin" && (
          <iframe
            src="https://giphy.com/embed/RHigihI7PAcelUUwQA"
            width="200"
            height="200"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        )}

        <div className="col-md-5 mx-auto main-bg text-center">
          <h4>MY EMAIL:</h4>
          <h6>{users?.email}</h6>
          <h4>ROLE:</h4>
          <h6>{users?.role?.toUpperCase()}</h6>
        </div>
      </div>
    </div>
  );
}
