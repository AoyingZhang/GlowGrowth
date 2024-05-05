import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, Paper, Button } from '@mui/material';
import PastJournals from './PastJournals'
function UserHomePage() {
  const { username } = useParams();  // Retrieve the username from URL parameters
  const navigate = useNavigate();  // Hook for navigation
  const [nickname, setNickname] = useState('');  // State to hold the nickname fetched from server

  useEffect(() => {
    // Function to fetch the user's nickname
    async function fetchNickname() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${username}/nickname`);
        const contentType = response.headers.get('Content-Type');
        if (!response.ok) {
          throw new Error(`Failed to fetch, status: ${response.status}`);
        }
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response');
        }
        const data = await response.json();
        setNickname(data.nickname);
      } catch (error) {
        console.error('Error fetching nickname:', error.message);
        setNickname('Nickname not found');  // Fallback nickname if fetch fails
      }
    }
    fetchNickname();
  }, [username]);  // Dependency array to trigger re-fetch when username changes

  const handleJournalClick = () => {
    navigate(`/journal/${username}`);  // Navigate to the Journal page
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Hello
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 1 }} onClick={handleJournalClick}>
          Record today's Journal
        </Button>
        <PastJournals/>
      </Paper>
    </Container>
  );
}

export default UserHomePage;
