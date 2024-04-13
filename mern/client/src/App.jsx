import { Outlet } from "react-router-dom";
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  
  return (
    <div>
      <Signup/>
      <Login />
    </div>
  );
}

export default App;
