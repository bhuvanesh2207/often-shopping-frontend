import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerService() {
  return (
    <div className="customer-service-container">
      <h1 className="title">Customer Service</h1>
      <p className="intro">
        We are here to help you! Our dedicated support team is ready to assist you with any questions, concerns, or issues you may have regarding your orders, products, or account.
      </p>

      <div className="section">
        <h2>📞 Contact Us</h2>
        <p>Email: <a href="mailto:support@yourshop.com">support@yourshop.com</a></p>
        <p>Phone: +91-98765-43210</p>
        <p>Live Chat: Available 10 AM – 6 PM IST</p>
      </div>

      <div className="section">
        <h2>📦 Order & Delivery Help</h2>
        <p>Track or report delivery issues directly from your <strong>"My Orders"</strong> page.</p>
      </div>

      <div className="section">
        <h2>🔒 Account & Security</h2>
        <p>Having trouble accessing your account? Need to update your personal details? Visit your <strong>Profile Page</strong> or contact our support for help.</p>
      </div>

      <div className="section">
        <h2>💭 FAQs</h2>
        <p>Browse our Frequently Asked Questions to quickly find answers to common inquiries about payments, returns, shipping, and more.</p>
      </div>

      <div className="back-home">
        <Link to="/" className="home-button">⬅ Back Home</Link>
      </div>
    </div>
  );
}
