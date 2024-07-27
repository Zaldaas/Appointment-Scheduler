import React, { useEffect, useState } from 'react';

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Manage Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>{appointment.name} - {appointment.date} {appointment.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageAppointments;
