import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosLogOut } from "react-icons/io";

export default function Profile() {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      axios.get('http://localhost:8080/getCustomerByEmail', {
        params: { email }
      })
      .then(res => {
        setCustomer(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch customer details:", err);
      });
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {customer ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
        </div>
      ) : (
        <p>Loading customer details...</p>
      )}

      <div className="profile-buttons">
        <Link to="/view_orders">Current Orders</Link>
        <button onClick={handleLogout}>
          Logout <IoIosLogOut className="logout-icon" />
        </button>
      </div>
    </div>

  );
}
