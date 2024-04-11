import React, { useState } from 'react';
//import db from './../../../server/db/connection.js'
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const b = db;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Redirect user or do something upon successful login
      } else {
        // Handle errors, e.g., show a message to the user
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit"
      onClick={() => {
        props.deleteRecord(props.record._id);
      }}
      >Signup</button>
      
    </form>
  );
}

export default Signup;
