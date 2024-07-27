const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const app = express();
const port = 3001;

app.use(express.json());

// Set up SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE appointments (id INTEGER PRIMARY KEY, name TEXT, email TEXT, date TEXT, time TEXT)');
});

// API endpoints
app.post('/api/book', (req, res) => {
  const { name, email, date, time } = req.body;
  db.run('INSERT INTO appointments (name, email, date, time) VALUES (?, ?, ?, ?)', [name, email, date, time], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to book appointment' });
    }
    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Appointment Confirmation',
      text: `Hi ${name}, your appointment is confirmed for ${date} at ${time}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to send confirmation email' });
      }
      res.json({ message: 'Appointment booked successfully' });
    });
  });
});

app.get('/api/appointments', (req, res) => {
  db.all('SELECT * FROM appointments', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve appointments' });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
