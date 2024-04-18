import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

function Journal() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    date: new Date().toISOString().slice(0, 10), // format YYYY-MM-DD
    mood: '',
    proud1: '',
    proud2: '',
    proud3: '',
    other: ''
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/api/journals/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      });
      if (response.ok) {
        alert('Journal entry saved!');
      } else {
        throw new Error('Failed to save journal entry.');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5">
          Journal Entry
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            name="mood"
            label="Mood"
            type="text"
            value={entry.mood}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="proud1"
            label="Proud of (1)"
            type="text"
            value={entry.proud1}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="proud2"
            label="Proud of (2)"
            type="text"
            value={entry.proud2}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="proud3"
            label="Proud of (3)"
            type="text"
            value={entry.proud3}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="other"
            label="Other Notes"
            type="text"
            value={entry.other}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save Entry
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Journal;
