import React from "react";
// import './HomePage.css';

function Homepage() {
  return (
    <div className="homepage">
      <section className="hero" id="home">
        <h1>Effortless Appointment Scheduling</h1>
        <p>Book, manage, and track appointments with ease.</p>
        <button className="cta-button">Get Started</button>
      </section>

      <section className="features">
        <div className="feature">
          <h2>Simple Booking Process</h2>
          <p>
            Schedule your appointments in just a few clicks. Our intuitive
            interface makes it easy for you to find available slots and book
            appointments.
          </p>
        </div>
        <div className="feature">
          <h2>Manage Your Appointments</h2>
          <p>
            Keep track of your upcoming appointments and make changes
            effortlessly. Our management tools are designed to help you stay
            organized.
          </p>
        </div>
        <div className="feature">
          <h2>Stay Notified</h2>
          <p>
            Receive reminders and notifications about your appointments. Never
            miss an important meeting or event.
          </p>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>
          "This app has simplified my life. I can book and manage appointments
          without any hassle. Highly recommended!"
        </blockquote>
        <blockquote>
          "The notification system is a game-changer. I never miss an
          appointment now."
        </blockquote>
        <blockquote>
          "The user interface is clean and easy to navigate. Great job!"
        </blockquote>
      </section>

      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="step">
          <h3>Sign Up and Log In</h3>
          <p>Create an account and log in to get started.</p>
        </div>
        <div className="step">
          <h3>Book an Appointment</h3>
          <p>
            Choose your preferred time and service, then book your appointment.
          </p>
        </div>
        <div className="step">
          <h3>Manage and Track</h3>
          <p>
            View your appointments, make changes, and stay updated with
            notifications.
          </p>
        </div>
      </section>

      <section className="about-us" id="about">
        <h2>About Us</h2>
        <p>
          We are dedicated to making appointment scheduling as easy and
          efficient as possible. Our team is committed to providing you with the
          best experience.
        </p>
      </section>

      <section className="contact" id="contact">
        <h2>Get in Touch</h2>
        <p>
          Have questions or need help? Contact us at{" "}
          <a href="mailto:support@appointmentscheduler.com">
            support@appointmentscheduler.com
          </a>{" "}
          or call us at (123) 456-7890.
        </p>
      </section>

      <footer>
        <ul>
          <li>
            <a href="#privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="#terms">Terms of Service</a>
          </li>
        </ul>
        <div className="social-media">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#linkedin">LinkedIn</a>
        </div>
        <p>© 2024 Appointment Scheduler. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
