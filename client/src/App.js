import React from 'react';
import BookingForm from './components/BookingForm';
import ManageAppointments from './components/ManageAppointments';

function App() {
  return (
    <div>
      <h1>Appointment Scheduler</h1>
      <BookingForm />
      <ManageAppointments />
    </div>
  );
}

export default App;
