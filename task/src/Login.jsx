import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');                                          
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Save token and redirect to admin page
      localStorage.setItem('token', response.data.token);
      alert("Login success");
      navigate('/Admin');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <Container style={{ maxWidth: '500px', marginTop: '2rem' }}>

    <div className="login-container">
      <center>
        <h2>User Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group><br></br>
          <Button variant="primary" type="submit">
            Login
          </Button>
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
      </center>
    </div>
    </Container>
  );
}
