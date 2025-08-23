import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Card } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('cookijar_user', JSON.stringify(user));
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@cookiejar.com',
      userPoints: 0
    };

    localStorage.setItem('cookijar_user', JSON.stringify(guestUser));
    localStorage.setItem('cookijar_guest_mode', 'true');
    navigate('/');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Cookie Jar Login</Card.Title>

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>

              <hr className="my-3" />

              <Button
                variant="outline-secondary"
                type="button"
                onClick={handleGuestLogin}
              >
                Continue as Guest
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}