import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
export default function CustomerNavbar() {
  return (
    <nav className="navigation navbar">
  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/view_cart_page">Cart</Link>
    <Link to="/customer_page">Shopp</Link>
    <Link to="/view_orders">My Orders</Link>
    <Link to="/logout">Logout</Link>
  </div>
  <Link to="/customer_profile_page" className="profile-link">
    <button className="profile-button">
      <img
        src="..."
        alt="Profile"
        className="profile-image"
      />
    </button>
  </Link>
</nav>

  );
}
