import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Button, Table, Form, Modal } from "react-bootstrap";
import Navbar from "./Navbar";

export default function Dashboard() {
  const { authToken, user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [show, setShow] = useState(false);
  const [editReport, setEditReport] = useState(null);
  const [newReport, setNewReport] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [authToken]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/reports`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    }
  };

  const handleShow = (report) => {
    setEditReport(report);
    setShow(true);
  };

  const handleClose = () => {
    setEditReport(null);
    setShow(false);
  };

  const handleSave = async () => {
    try {
      if (editReport) {
        await axios.put(
          `${import.meta.env.VITE_URL}/api/reports/${editReport._id}`,
          { title: newReport.title, content: newReport.content },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_URL}/api/reports`,
          { title: newReport.title, content: newReport.content },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/api/reports`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setReports(response.data);
      handleClose();
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };
  const handleDelete = async (reportId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_URL}/api/reports/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Report deleted successfully`);
      fetchReports();
    } catch (error) {
      console.error(
        "Error deleting Reports:",
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
          <h1 className="text-center mb-4">Dashboard</h1>
          <div className="d-flex justify-content-end mb-3 ">
            <Button
              variant="primary"
              className="createbtn"
              onClick={() => handleShow(null)}
            >
              Create Report
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.title}</td>
                  <td>{report.content}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShow(report)}
                    >
                      Edit
                    </Button>
                    {user.role == "admin" && (
                      <Button
                        variant="warning"
                        className="deletebtn ms-2"
                        onClick={() => handleDelete(report._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editReport ? "Edit Report" : "Create Report"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newReport.title}
                    onChange={(e) =>
                      setNewReport({ ...newReport, title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newReport.content}
                    onChange={(e) =>
                      setNewReport({ ...newReport, content: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}
