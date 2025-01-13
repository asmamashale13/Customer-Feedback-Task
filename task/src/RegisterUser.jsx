import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import AdminPage from './AdminPage';

export default function RegisterEmployee() {
  const [empName, setEmpName] = useState('');
  const [empEmergencyMob, setEmpEmergencyMob] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: UserName,
       
        email: Email,
    
        password: Password
      });
      setResponseMessage(response.data.message);
      setResponseType('success'); // Set the message type to success
      alert("Employee Added Successfully");

      // Reset form fields
      setUserName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setResponseMessage(err.response.data.message); // Show duplicate error message
        setResponseType('danger'); // Set the message type to danger
        alert("Employee Already Exist With This Name");
      } else {
        setResponseMessage('Failed to register employee. Please try again.');
        setResponseType('danger'); // Set the message type to danger
      }
    }
  };

  return (
    <>
      <Container style={{ maxWidth: '500px', marginTop: '2rem' }}>
        <h2 className="text-center my-4">Register User</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="userName">
            <Form.Label>User Name<span style={{ color: 'red' }}> * </span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              value={username}
              onChange={(e) => setEmpName(e.target.value)}
              required
            />
          </Form.Group>

          
          <Form.Group controlId="email">
            <Form.Label> Email<span style={{ color: 'red' }}> * </span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Employee Email"
              value={Email}
              onChange={(e) => setEmpEmail(e.target.value)}
              required
            />
          </Form.Group>

          

          <Form.Group controlId="password" className="mt-3">
            <Form.Label> Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPasswords(e.target.value)}
              required
            />
          </Form.Group>

          <Container className="d-flex justify-content-center my-4">
            <Button variant="success" type="submit" className="mt-4">
              Sign Up
            </Button>
          </Container>
        </Form>

        {responseMessage && (
          <Alert variant={responseType} className="mt-4">
            {responseMessage}
          </Alert>
        )}
      </Container>
    </>
  );
}

  