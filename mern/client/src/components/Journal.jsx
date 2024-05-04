import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { API_BASE_URL } from '../config';
function Journal() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    date: new Date().toISOString().slice(0, 10),
    mood: '',
    proud1: '',
    proud2: '',
    proud3: '',
    other: ''
  });

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/journals/${username}/${entry.date}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setEntry(data); // Make sure all fields, including _id, are set here
        }
      } catch (error) {
        console.error('Failed to fetch journal entry:', error);
      }
    };
    fetchEntry();
  }, [username, entry.date]);
  
  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var endpoint= '';
    const method = entry._id ? 'PUT' : 'POST'; // Determine if it's an update or create
    console.log(method);
    console.log(entry);
    if(method=='POST'){
      endpoint = `${API_BASE_URL}/api/journals/${username}`;
    }
    else{
      endpoint = `${API_BASE_URL}/api/journals/${username}/${entry.date}`
    }
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      });
  
      if (!response.ok) {
        throw new Error('Failed to save journal entry.');
      }
  
      const result = await response.json();
      alert(result.message);
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
          Record 3 things you accomplished today...
          <TextField
            margin="normal"
            fullWidth
            name="proud1"
            label="1. "
            type="text"
            value={entry.proud1}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="proud2"
            label="2. "
            type="text"
            value={entry.proud2}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="proud3"
            label="3. "
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
