import React, { useState } from 'react';

function Signup() {
  const [user, setUser] = useState({username:'', email:'', password:''});
   
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
        <>
            <h3>Enter username, email and password</h3>
            <form>
                <label>
                    <input 
                        type="username" 
                        name="username"
                        onChange={handleChange}
                        placeholder="Username"
                    />
                </label>
                <label>
                    <input 
                        type="email" 
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </label>
                <label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </label>
                <button 
                    type="submit" 
                    onClick={handleSubmit}
                >
                    Sign up
                </button>
            </form>
        </>
    );
}

export default Signup;
