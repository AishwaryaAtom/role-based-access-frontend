import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="container mt-5">
          <div className="text-center">
            <img
              src="https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif"
              alt="Profile GIF"
              className="img-fluid"
              width="400"
              height="400"
            />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
