import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  
  return (
    <div>
      {/* Other components */}
      <Signup/>
      <Login />
      {/* Other components */}
    </div>
  );
}

export default App;
