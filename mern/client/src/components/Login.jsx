import React, { useState } from 'react';

function Login() {
  const [user, setUser] = useState({email:'', password:''});
   
    const handleChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value
      })    
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(user)
      const response = await fetch('/api/login', {
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
    }

    return (
        <>
            <h3>Enter email and password</h3>
            <form>
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
                    Log in
                </button>
            </form>
        </>
    );
}

export default Login;
