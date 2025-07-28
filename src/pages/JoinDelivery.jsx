import React, { useState } from 'react';
import axios from 'axios';

export default function DeliverySignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');

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
    <div style={{ padding: '20px' }}>
      <h2>Delivery Person Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>

        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone Number:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

        <label>Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label>Document URL:</label>
        <input type="url" value={documentUrl} onChange={(e) => setDocumentUrl(e.target.value)} required />

        <button type="submit" style={{ marginTop: '20px' }}>Sign Up</button>
      </form>
    </div>
  );
}