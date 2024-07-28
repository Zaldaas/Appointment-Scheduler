// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">Appointment Scheduler</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/book">Book Appointment</Link>
        </li>
        <li>
          <Link to="/manage">Manage Appointments</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
