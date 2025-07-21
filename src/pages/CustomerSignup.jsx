import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const data = { name, email, password };

    // Send the data to the backend
    axios
      .post("http://localhost:8080/customerSignup", data, {
        headers: {
          'Content-Type': 'application/json', // Ensure Content-Type is application/json
        },
      })
      .then((res) => {
        // On success, navigate to the login page
        navigate("/signin");
      })
      .catch((err) => {
        // Handle error and show an alert
        console.error("Error:", err);
        alert("An error occurred while signing up. Please try again.");
      });
  };

  return (
    <>
    
      <form onSubmit={handleSubmit}>
        <h2>Customer Signup Form</h2>

        <label htmlFor="name">Name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <input type="submit" value="SIGN UP" />
      </form>
    </>
  );
}
