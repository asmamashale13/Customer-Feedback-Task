import React, { useState, useEffect } from "react";
import Admin from "../Admin";
import { Container } from "react-bootstrap";

const AdminPanel = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackId, setFeedbackId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch feedback data from backend
  const fetchFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feedback");
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Handle Add or Edit Feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isEditing
      ? "http://localhost:5000/api/feedback/edit"
      : "http://localhost:5000/api/feedback/add";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: feedbackId, feedback }),
      });
      const result = await response.json();
      alert(result.message);
      setFeedback("");
      setFeedbackId(null);
      setIsEditing(false);
      fetchFeedback(); // Refresh feedback list
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Handle Delete Feedback
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      alert(result.message);
      fetchFeedback(); // Refresh feedback list
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <>
    <Admin/>
    <div>
      <Container style={{ maxWidth: '800px', marginTop: '2rem' }}>
    
      <h2>Admin Feedback Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          rows="3"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={isEditing ? "Edit feedback..." : "Add feedback..."}
        />
        <button type="submit" className="btn btn-primary mt-2">
          {isEditing ? "Update Feedback" : "Add Feedback"}
        </button>
      </form>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.feedback_text}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => {
                    setIsEditing(true);
                    setFeedback(item.feedback_text);
                    setFeedbackId(item.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Container>
    </div>
    </>
  );
};

export default AdminPanel;
