import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Paper } from '@mui/material';

function UserHomePage() {
  const { username } = useParams();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    async function fetchNickname() {
      try {
          const response = await fetch(`http://localhost:5050/api/users/${username}/nickname`);
          
          const contentType = response.headers.get('Content-Type');
  
          if (!response.ok) {
              throw new Error(`Failed to fetch, status: ${response.status}`);
          }
          console.log(response);
          if (!contentType || !contentType.includes('application/json')) {
              throw new Error('Received non-JSON response');
          }
          const data = await response.json();
          setNickname(data.nickname);
      } catch (error) {
          console.error('Error fetching nickname:', error.message);
          setNickname('Nickname not found');
      }
  }
  
    fetchNickname();
  }, [username]); // Depend on username to refetch if it changes

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Hello {nickname || username}
        </Typography>
      </Paper>
    </Container>
  );
  
}

export default UserHomePage;
