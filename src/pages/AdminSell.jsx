import React from 'react';
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function AdminSell() {
  return (
    <div className="admin-sell">
      {/* Header */}
      <header className="admin-sell-header">
        <div className="header-container">
          <div className="logo-section">
            <RiShoppingBag4Fill className="logo-icon" />
            <span className="logo-text">Sell with Oftern Shopping</span>
          </div>
          <div className="header-buttons">
            <div className="learn-more">
              <FaCheckCircle className="offer-icon" />
              <button className="offer-button">Learn more</button>
            </div>
            <Link to="/admin_signup" className="signup-button">Sign up*</Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="admin-sell-main">
        <div className="main-content">
          <div className="left-content">
            <h1 className="main-title">
              Create an Oftern Shopping <br /> seller account
            </h1>
            <Link to="/admin_signup" className="start-selling-button">
              Start Selling
            </Link>
          </div>

          <div className="right-content">
            <img
              src="https://blog.hubspot.com/hubfs/ecommerce-10.jpg"
              alt="Sell products"
              className="sell-image"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
