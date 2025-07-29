import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../style/Form.css';

export default function JoinDelivery() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');

  const nameRef = useRef(null);
  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      phoneNumber,
      address,
      documentUrl
    };

    try {
      const response = await axios.post('http://localhost:8080/deliverySignup', payload);
      console.log('Delivery person signup success:', response.data);
      alert("Signup successful!");
    } catch (error) {
      console.error('Error during signup:', error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2>Delivery Person Signup</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

          <label>Address:</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />

          <label>Document URL:</label>
          <input type="url" value={documentUrl} onChange={(e) => setDocumentUrl(e.target.value)} required />

          <button type="submit" className="auth-button">Join Delivery</button>
        </form>
      </div>
    </div>
  );
}