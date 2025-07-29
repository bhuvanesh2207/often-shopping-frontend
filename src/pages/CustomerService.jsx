import React from 'react';
import { Link } from 'react-router-dom';

import '../style/CustomerService.css';

export default function CustomerService() {
  return (
    <div className="container">
      <h1 className="customer-service__title">Customer Service</h1>
      <p className="customer-service__intro">
        We are here to help you! Our dedicated support team is ready to assist you with any questions, concerns, or issues you may have regarding your orders, products, or account.
      </p>

      <div className="customer-service__section">
        <h2 className="customer-service__section-title">📞 Contact Us</h2>
        <p>Email: <a href="mailto:support@yourshop.com" className="customer-service__link">support@yourshop.com</a></p>
        <p>Phone: +91-98765-43210</p>
        <p>Live Chat: Available 10 AM – 6 PM IST</p>
      </div>

      <div className="customer-service__section">
        <h2 className="customer-service__section-title">📦 Order & Delivery Help</h2>
        <p>Track or report delivery issues directly from your <strong>My Orders</strong> page.</p>
      </div>

      <div className="customer-service__section">
        <h2 className="customer-service__section-title">🔒 Account & Security</h2>
        <p>Having trouble accessing your account? Need to update your personal details? Visit your <strong>Profile Page</strong> or contact our support for help.</p>
      </div>

      <div className="customer-service__section">
        <h2 className="customer-service__section-title">💭 FAQs</h2>
        <p>Browse our Frequently Asked Questions to quickly find answers to common inquiries about payments, returns, shipping, and more.</p>
      </div>

      <div className="customer-service__footer">
        <Link to="/" className="customer-service__back-button">⬅ Back Home</Link>
      </div>
    </div>
  );
}
