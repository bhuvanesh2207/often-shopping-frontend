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
        }
      })
      .catch(err => {
        alert("Invalid user " + err);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
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

        <input type="submit" value="SIGN In" />
      </form>
    </>
  );
}
