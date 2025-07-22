import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Prevent submit if any fields are empty
  const requiredFieldsMissing = !name || !email || !password;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, email, password };

    axios
      .post("http://localhost:8080/customerSignup", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred while signing up. Please try again.");
      });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Customer Signup Form</h2>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="auth-button"
          disabled={requiredFieldsMissing}
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}
