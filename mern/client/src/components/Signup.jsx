import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({email:'', password:''});
   
    const handleChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value
      })    
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user);
  
      // Send user data to server
      const response = await fetch('http://localhost:5050/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      console.log(response);
      if (response.ok) {
        console.log('SignUp successful');
      } else {
        console.log('SignUp failed');
      }
    }

    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign up
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
              Sign up
            </Button>
            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Already have an account? Log in
            </Button>
          </Box>
        </Paper>
      </Container>
    );
}

export default Signup;
