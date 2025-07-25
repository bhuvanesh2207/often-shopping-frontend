import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function AdminNavbar() {
  return (
    <nav className="navigation">
      <div className="nav-links">
        <Link to="/admin_page">Dashboard</Link>
        <Link to="/add_product">Manage Products</Link>
        <Link to="/changePassword_page">Change Password</Link>
        <Link to="/ordered_product">Orderd Products</Link>
      </div>
      <Link to="/admin_profile_page" className="profile-link">
        <button className="profile-button">
          <img
            src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Photos.png"
            alt="Profile"
            className="profile-image"
          />
        </button>
      </Link>
    </nav>
  );
}
