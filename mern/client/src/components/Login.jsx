import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const response = await fetch('http://localhost:5050/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      console.log('Login successful');
    } else {
      console.log('Login failed');
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
            don't have an account yet? sign up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
