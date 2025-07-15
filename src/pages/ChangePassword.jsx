import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Track flow step

  // Step 1: Generate OTP
  const handleGenerateOtp = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/generatedOtp', { email })
      .then((res) => {
        alert('OTP sent to your email');
        setStep(2);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to generate OTP');
      });
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/verifyOtp', { email, otp })
      .then((res) => {
        alert('OTP verified successfully');
        setStep(3);
      })
      .catch((err) => {
        console.error(err);
        alert('Invalid OTP');
      });
  };

  // Step 3: Set New Password
  const handleSetPassword = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/setPassword', { email, newPassword })
      .then((res) => {
        alert('Password changed successfully');
        setStep(1); // Reset flow
        setEmail('');
        setOtp('');
        setNewPassword('');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to reset password');
      });
  };

  return (
    <div>
      <h2>Change Password</h2>

      {step === 1 && (
        <form onSubmit={handleGenerateOtp}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <button type="submit">Get OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <label>Enter OTP:</label><br />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          /><br />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSetPassword}>
          <label>New Password:</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          /><br />
          <button type="submit">Set Password</button>
        </form>
      )}
    </div>
  );
}
