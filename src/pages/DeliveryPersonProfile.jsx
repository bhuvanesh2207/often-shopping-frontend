import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DeliveryPersonNavbar from './DeliveryPersonNavbar';
export default function DeliveryPersonProfile() {
  const email = localStorage.getItem("email");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (email) {
      axios.get("http://localhost:8080/getByDeliveryEmail", {
        params: { email }
      })
      .then((res) => {
        if (res.data) {
          setProfile(res.data); // assuming the backend sends the object directly
        }
      })
      .catch((err) => {
        console.error("Error fetching delivery person:", err);
      });
    }
  }, [email]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <>
      <DeliveryPersonNavbar/>
      <div className="container">
        <h2>Delivery Person Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>
      </div>
    </>
  );
}
