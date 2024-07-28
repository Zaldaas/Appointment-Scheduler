import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import BookingForm from "./components/BookingForm";
import ManageAppointments from "./components/ManageAppointments";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/manage" element={<ManageAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;
