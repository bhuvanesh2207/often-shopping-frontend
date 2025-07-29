import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/Form.css';

export default function CustomerDeliveryOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');
  const otpRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
    } else {
      setError("Invalid access. No Order ID found.");
    }
  }, [location.state]);

  useEffect(() => {
    if (otpRef.current) otpRef.current.focus();
  }, []);

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
    <div className="container">
      <h2>Verify Customer OTP</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Enter OTP:</label>
        <input
          type="text"
          ref={otpRef}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Verify OTP</button>
      </form>
    </div>
  );
}
