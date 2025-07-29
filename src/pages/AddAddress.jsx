import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Form.css';

export default function AddAddress() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [landmark, setLandmark] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const nameRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Customer email not found in localStorage!");
      return;
    }
    setIsLoading(true);

    const payload = {
      email: email,         
      fullName,
      phone,
      pincode,
      street,
      city,
      state: stateVal,
      landmark,
      type,
    };

    axios
      .post("http://localhost:8080/addAddress", payload)
      .then(res => {
        alert("Address added successfully.");
        navigate("/checkout");
      })
      .catch(err => {
        alert("Fail to add address");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container">
      <h2>Add Address</h2>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            ref={nameRef}
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
          <label>Phone:<br />
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required />
          </label><br />
          <label>Pincode:<br />
            <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} required />
          </label><br />
          <label>Street:<br />
            <input type="text" value={street} onChange={e => setStreet(e.target.value)} required />
          </label><br />
          <label>City:<br />
            <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
          </label><br />
          <label>State:<br />
            <input type="text" value={stateVal} onChange={e => setStateVal(e.target.value)} required />
          </label><br />
          <label>Landmark:<br />
            <input type="text" value={landmark} onChange={e => setLandmark(e.target.value)} />
          </label><br />
          <label>Type:<br />
            <select value={type} onChange={e => setType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
          </label><br /><br />
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Address"}
          </button>
        </form>
      </div>
      <br />
      <Link to="/checkout"><button>Back to Checkout</button></Link>
    </div>
  );
}
