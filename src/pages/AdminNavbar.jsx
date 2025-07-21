import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  return (
    <nav className="navbar navigation">
      <Link to="/admin_page" >Dashboard</Link>
      <Link to="/add_product" >Manage Products</Link>
      <Link to="/changePassword_page" >Change Password</Link>
      <Link to="/" >Logout</Link>
    </nav>
  );
}
