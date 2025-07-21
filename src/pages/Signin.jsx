import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password }; 

    axios.post('http://localhost:8080/signin', data)
      .then(res => {
        // Getting the response data from the database
        const { role, id, email: responseEmail } = res.data;

        localStorage.setItem('email', responseEmail);
        localStorage.setItem('id', id);
        localStorage.setItem('role', role);

        if (role === "admin") {
          navigate("/admin_page");
        } else if (role === "customer") {
          navigate("/customer_page");
        } else {
          alert('Unknown role received: ' + role);
          console.log(role)
        }
      })
      .catch(err => {
        alert("Invalid user " + err);
      });
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} method="post">
        <h2>Sign In</h2>
        
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

        <button type="submit" className="auth-button">SIGN IN</button>
      </form>
    </div>
  );
}