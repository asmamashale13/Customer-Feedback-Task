import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Admin from "../Admin";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackId, setFeedbackId] = useState(null); // For edit functionality
  const [isEditing, setIsEditing] = useState(false);

  const handleAddFeedback = () => {
    setIsEditing(false);
    setFeedback("");
    setFeedbackId(null);
  };

  const handleEditFeedback = (existingFeedback, id) => {
    setIsEditing(true);
    setFeedback(existingFeedback);
    setFeedbackId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isEditing
      ? "http://localhost:5000/api/feedback/edit"
      : "http://localhost:5000/api/feedback/add";
  
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: feedbackId, feedback }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }
  
      const result = await response.json();
      alert(result.message);
      setFeedback("");
      setFeedbackId(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred: " + error.message);
    }
  };
  
  return (
    <div>
      <Admin/>
      <Container style={{ maxWidth: '800px', marginTop: '2rem' }}>
      <h2>Feedback</h2>
      <div className="mb-3">
        <button onClick={handleAddFeedback}>Add Feedback</button>
        <button onClick={() => handleEditFeedback("Sample Feedback", 1)}>Edit Feedback</button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          rows="3"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={isEditing ? "Edit your feedback..." : "Add your feedback..."}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
      </Container>
    </div>
    
  );
};

export default FeedbackForm;
