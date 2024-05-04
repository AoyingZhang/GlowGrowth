import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import { API_BASE_URL } from './../config';
function PastJournals() {
  const { username } = useParams();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/journals/${username}`);
        if (response.ok) {
          const data = await response.json();
          setJournals(data);
        } else {
          throw new Error('Failed to fetch journals');
        }
      } catch (error) {
        console.error('Error fetching journals:', error);
        alert('Failed to fetch journals');
      }
    };
    fetchJournals();
  }, [username]);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h5" component="h1" guttertop>
        Past Journal Entries
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <List>
          {journals.map((journal, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Date: ${journal.date} - Mood: ${journal.mood}`}
                secondary={`My accomplishments of the day: 
                1. ${journal.proud1} \n
                2. ${journal.proud2} \n
                3. ${journal.proud3}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default PastJournals;
