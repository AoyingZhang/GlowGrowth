import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    console.log(response);
    if (response.ok) {
      const result = await response.json();
      console.log('Login successful');
      setErrorMessage('');
      navigate(`/${result.username}`);  // Navigate to user's homepage using their username
    } else {
      const result = await response.json(); // Assuming server sends back why login failed
      console.log('Login failed');
      setErrorMessage(result.message || 'Login failed'); // Set the error message from response
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Button
            component={Link}
            to="/"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Don't have an account yet? Sign up
          </Button>
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
