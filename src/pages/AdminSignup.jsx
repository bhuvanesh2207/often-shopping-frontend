import React, { useState } from 'react';
import axios from 'axios';

export default function AdminSignup() {
  // Separate state variables for each field
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [documentPath, setDocumentPath] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Collect all variables into `data` before sending
    const data = {
      businessName,
      businessType,
      gstNumber,
      panNumber,
      companyEmail,
      businessAddress,
      city,
      state,
      pincode,
      documentPath
    };

    axios.post("http://localhost:8080/adminSignup", data)
      .then(res => {
        alert("SignUp Successful check mail for Futher Details");

        if (res.data && res.data.adminId) {
      const admindetails = localStorage.setItem('adminId', res.data.adminId);
      console.log(admindetails)
    }

      })
      .catch(err => {
        alert("Error Occurred");
      });
  };

  return (
    <>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit} method="post">

        <label htmlFor="businessName">Business Name:</label><br />
        <input type="text" id="businessName" name="businessName" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} /><br /><br />

        <label htmlFor="businessType">Business Type:</label><br />
        <input type="text" id="businessType" name="businessType" required value={businessType} onChange={(e) => setBusinessType(e.target.value)} /><br /><br />

        <label htmlFor="gstNumber">GST Number:</label><br />
        <input type="text" id="gstNumber" name="gstNumber" required value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} /><br /><br />

        <label htmlFor="panNumber">PAN Number:</label><br />
        <input type="text" id="panNumber" name="panNumber" required value={panNumber} onChange={(e) => setPanNumber(e.target.value)} /><br /><br />

        <label htmlFor="companyEmail">Company Email:</label><br />
        <input type="email" id="companyEmail" name="companyEmail" required value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} /><br /><br />

        <label htmlFor="businessAddress">Business Address:</label><br />
        <input type="text" id="businessAddress" name="businessAddress" required value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} /><br /><br />

        <label htmlFor="city">City:</label><br />
        <input type="text" id="city" name="city" required value={city} onChange={(e) => setCity(e.target.value)} /><br /><br />

        <label htmlFor="state">State:</label><br />
        <input type="text" id="state" name="state" required value={state} onChange={(e) => setState(e.target.value)} /><br /><br />

        <label htmlFor="pincode">Pincode:</label><br />
        <input type="text" id="pincode" name="pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)} /><br /><br />

        <p>
          Please upload a PDF containing the following business documents:
          <ul>
            <li>GST Certificate</li>
            <li>PAN Card</li>
            <li>Company Registration Document</li>
          </ul>
          Provide the link or path on below section.
        </p> <br></br> <br></br>
        <label htmlFor="documentPath">Document Link/Path:</label><br />
        <input type="text" id="documentPath" name="documentPath" required value={documentPath} onChange={(e) => setDocumentPath(e.target.value)} /><br /><br />

        <input type="submit" value="SIGN UP" />
      </form>
    </>
  );
}