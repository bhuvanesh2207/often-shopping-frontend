import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'; // Reuse same CSS or create delivery-specific styles

export default function DeliveryPersonNavbar({ children }) {
  return (
    <>
      <nav className="navigation">
        
        <div className="nav-links">
          <Link to="/delivery_page">Home</Link>
          <Link to="/delivery_person_change_pass">Change Password</Link>
          <Link to="/delivery_orders">Orders</Link>
        </div>
        <Link to="/delivery_person_profile" className="profile-link">
          <button className="profile-button">
            <img
              src="https://cdn-icons-png.flaticon.com/512/706/706831.png" // A delivery profile icon
              alt="Profile"
              className="profile-image"
            />
          </button>
        </Link>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  );
}
