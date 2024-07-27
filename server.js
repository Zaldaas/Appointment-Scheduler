const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const app = express();
const port = 3001;

app.use(express.json());

// Set up SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE appointments (id INTEGER PRIMARY KEY, name TEXT, employee_id TEXT, email TEXT, date TEXT, time TEXT)');
});

// Function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Adjust for timezone offset
  return date.toLocaleDateString('en-US', options);
};

// Function to format the time
const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Function to send email
const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codersoncodey@gmail.com',
      pass: 'ycfzvvxebbswqccu',
    },
  });

  const mailOptions = {
    from: 'codersoncodey@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// API endpoint to book an appointment
app.post('/api/book', (req, res) => {
  const { name, employee_id, email, date, time } = req.body;
  db.run('INSERT INTO appointments (name, employee_id, email, date, time) VALUES (?, ?, ?, ?, ?)', [name, employee_id, email, date, time], function(err) {
    if (err) {
      console.error('Failed to book appointment:', err);
      return res.status(500).json({ message: 'Failed to book appointment' });
    }

    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);
    const emailText = `Hi ${name}, your appointment is confirmed for ${formattedDate} at ${formattedTime}.`;

    sendEmail(email, 'Appointment Confirmation', emailText);
    res.json({ message: 'Appointment booked successfully' });
  });
});

// API endpoint to get all appointments
app.get('/api/appointments', (req, res) => {
  db.all('SELECT * FROM appointments', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve appointments' });
    }
    res.json(rows);
  });
});

// API endpoint to update an appointment
app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { date, time, email } = req.body;

  db.get('SELECT * FROM appointments WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to find appointment' });
    }

    const formattedOldDate = formatDate(row.date);
    const formattedOldTime = formatTime(row.time);
    const formattedNewDate = formatDate(date);
    const formattedNewTime = formatTime(time);

    db.run('UPDATE appointments SET date = ?, time = ?, email = ? WHERE id = ?', [date, time, email, id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to update appointment' });
      }

      if (formattedOldDate !== formattedNewDate || formattedOldTime !== formattedNewTime) {
        const emailText = `Hi ${row.name}, your appointment has been updated to ${formattedNewDate} at ${formattedNewTime}.`;
        sendEmail(email, 'Appointment Updated', emailText);
      }

      res.json({ message: 'Appointment updated successfully' });
    });
  });
});

// API endpoint to delete an appointment
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM appointments WHERE id = ?', [id], (err, row) => {
    if (err || !row) {
      return res.status(500).json({ message: 'Failed to find appointment' });
    }
    db.run('DELETE FROM appointments WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete appointment' });
      }

      const emailText = `Hi ${row.name}, your appointment for ${formatDate(row.date)} at ${formatTime(row.time)} has been canceled.`;

      sendEmail(row.email, 'Appointment Canceled', emailText);
      res.json({ message: 'Appointment deleted successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
