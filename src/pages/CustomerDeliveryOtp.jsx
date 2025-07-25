import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CustomerDeliveryOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
    } else {
      setError("Invalid access. No Order ID found.");
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !orderId) {
      setError("OTP or Order ID is missing.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/verifyDeliveryOtp?orderId=${orderId}&otp=${otp}`);

      if (response.data === "OTP verified successfully!") {
        alert("OTP Verified! Order marked as delivered.");
        navigate("/delivery_page"); 
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again later.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Verify Customer OTP</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP:</label><br />
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{ padding: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}
        /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Verify OTP</button>
      </form>
    </div>
  );
}
