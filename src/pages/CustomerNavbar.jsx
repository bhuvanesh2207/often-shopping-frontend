import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerNavbar() {
  return (
    <nav className="navbar navigation">
      <Link to="/" >Home</Link>
      <Link to="/view_cart_page" >Cart</Link>
      <Link to="/view_orders" >My Orders</Link>
      <Link to="/" >Logout</Link>
    </nav>
  );
}
