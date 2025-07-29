import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import DeliveryPersonNavbar from './DeliveryPersonNavbar';
import '../style/Form.css';

export default function AdminChangePassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Track flow step

  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const newPasswordRef = useRef(null);
  useEffect(() => {
    if (step === 1 && emailRef.current) emailRef.current.focus();
    if (step === 2 && otpRef.current) otpRef.current.focus();
    if (step === 3 && newPasswordRef.current) newPasswordRef.current.focus();
  }, [step]);

  // Step 1: Generate OTP
  const handleGenerateOtp = (e) => {
    e.preventDefault();

    axios
      .get('http://localhost:8080/deliveryPerChangePasswordotp', { params: { email }})

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
      .post('http://localhost:8080/deliveryPerOtpVerification', { email, otp })
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

    axios.post('http://localhost:8080/deliveryPerResetPassword', { deliveryEmail: email, newPassword: newPassword })
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
    <>
      <DeliveryPersonNavbar/>
      <div className="container">
        <h2>Change Password</h2>
        {step === 1 && (
          <form onSubmit={handleGenerateOtp} className="auth-form">
            <label>Email:</label><br />
            <input
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br />
            <button type="submit" className="auth-button">Get OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <label>Enter OTP:</label><br />
            <input
              type="text"
              ref={otpRef}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            /><br />
            <button type="submit" className="auth-button">Verify OTP</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSetPassword} className="auth-form">
            <label>New Password:</label><br />
            <input
              type="password"
              ref={newPasswordRef}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            /><br />
            <button type="submit" className="auth-button">Set Password</button>
          </form>
        )}
      </div>
    </>
  );
}
