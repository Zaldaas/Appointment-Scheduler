import React, { useEffect, useState } from "react";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/appointments/${editingAppointment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingAppointment),
    });
    const result = await response.json();
    alert(result.message);
    setEditingAppointment(null);
    const fetchAppointments = async () => {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
    };
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    alert(result.message);
    const fetchAppointments = async () => {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
    };
    fetchAppointments();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAppointment({ ...editingAppointment, [name]: value });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Adjust for timezone offset
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <h2>Manage Appointments</h2>
      {editingAppointment ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            name="name"
            value={editingAppointment.name}
            onChange={handleChange}
            placeholder="Name"
            readOnly
          />
          <input
            type="text"
            name="employee_id"
            value={editingAppointment.employee_id}
            onChange={handleChange}
            placeholder="Employee ID"
            readOnly
          />
          <input
            type="email"
            name="email"
            value={editingAppointment.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="date"
            name="date"
            value={editingAppointment.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={editingAppointment.time}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.name} - {formatDate(appointment.date)}{" "}
              {formatTime(appointment.time)}
              <button onClick={() => handleEdit(appointment)}>Edit</button>
              <button onClick={() => handleDelete(appointment.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageAppointments;
