import React from 'react';
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import {Link} from 'react-router-dom'
export default function AdminSell() {
  return (
    <div className="admin-sell">
      {/* Header */}
      <header className="admin-sell-header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo-section">
              <RiShoppingBag4Fill className="logo-icon" />
              <span className="logo-text">Sell with Oftern Shopping</span>
            </div>
          </div>

          <div className="header-right">
            <div className="offer-banner">
              <FaCheckCircle className="offer-icon" />

              <button className="offer-button">Learn more</button>
            </div>
            <button className="signup-button"><Link to={'/admin_signup'}>Sign up*</Link></button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-sell-main">
        <div className="main-grid">
          {/* Left Content */}
          <div className="main-left">
            <h1 className="main-title">
              Create an Oftern Shopping <br />
              seller account
            </h1>
            <div className="main-actions">
              <button className="signup-button-lg"><Link to={'/admin_signup'}>Start Selling</Link></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
