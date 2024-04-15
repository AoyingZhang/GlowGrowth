import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Paper, TextField, Button } from '@mui/material';

function UserHomePage() {
  const { username } = useParams();
  const [nickname, setNickname] = useState('');
  const [entry, setEntry] = useState('');
  const [message, setMessage] = useState('');

  //get username
  useEffect(() => {
    async function fetchNickname() {
      try {
        const response = await fetch(`http://localhost:5050/api/users/${username}/nickname`);
        if (!response.ok) {
          throw new Error(`Failed to fetch, status: ${response.status}`);
        }
        const data = await response.json();
        setNickname(data.nickname);
      } catch (error) {
        console.error('Error fetching nickname:', error.message);
        setNickname('Nickname not found');
      }
    }
    fetchNickname();
  }, [username]);

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  //submit journal
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5050/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, entry, date: new Date().toISOString().substring(0, 10) }),
      });
      if (!response.ok) {
        throw new Error(`Failed to save entry, status: ${response.status}`);
      }
      const result = await response.json();
      setMessage('Entry saved successfully!');
      setEntry(''); // Clear the entry field after successful save
    } catch (error) {
      console.error('Error saving entry:', error.message);
      setMessage('Failed to save entry');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Hello {nickname || username}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Write your journal entry"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={entry}
            onChange={handleEntryChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Save Entry
          </Button>
          {message && (
            <Typography color="secondary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
  
}

export default UserHomePage;
