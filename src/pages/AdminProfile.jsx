import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosLogOut } from "react-icons/io";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      axios.get('http://localhost:8080/getByCompanyEmail', {
        params: { email }
      })
      .then(res => {
        setAdmin(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch admin details:", err);
      });
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>

      {admin ? (
        <div className="profile-details">
          <p><strong>Business Name:</strong> {admin.businessName}</p>
          <p><strong>Business Type:</strong> {admin.businessType}</p>
          <p><strong>GST Number:</strong> {admin.gstNumber}</p>
          <p><strong>PAN Number:</strong> {admin.panNumber}</p>
          <p><strong>Company Email:</strong> {admin.companyEmail}</p>
          <p><strong>Business Address:</strong> {admin.businessAddress}</p>
          <p><strong>City:</strong> {admin.city}</p>
          <p><strong>State:</strong> {admin.state}</p>
          <p><strong>Pincode:</strong> {admin.pincode}</p>
        </div>
      ) : (
        <p>Loading admin details...</p>
      )}

      <div className="profile-buttons">
        <button onClick={handleLogout}>
          Logout <IoIosLogOut className="logout-icon" />
        </button>
      </div>
    </div>
  );
}
