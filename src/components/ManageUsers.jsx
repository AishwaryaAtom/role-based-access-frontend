import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      }
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      alert(`User has been updated to the Role ${newRole}`);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User deleted successfully");
      alert(`User has been Deleted`);
      getUsers();
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <>
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
        <div className="container mt-5">
          {message == null ? (
            <h1 className="text-center mb-4">Dashboard</h1>
          ) : null}
          {message == null ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Edit Role </th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) =>
                          updateUserRole(user._id, e.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={(e) => deleteUser(user._id)}
                        className="deletebtn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              <h1>{message}</h1>
              <h3>You have no access to this page</h3>
              <img
                src="https://media.giphy.com/media/j0HjChGV0J44KrrlGv/giphy.gif"
                alt="No Entry"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
