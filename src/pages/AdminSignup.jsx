import React, { useState } from 'react';
import axios from 'axios';

export default function AdminSignup() {
  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    gstNumber: "",
    panNumber: "",
    companyEmail: "",
    businessAddress: "",
    city: "",
    state: "",
    pincode: "",
    documentPath: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/adminSignup", formData)
      .then(res => {
        alert("SignUp Successful. Check mail for further details.");
        if (res.data && res.data.adminId) {
          localStorage.setItem('adminId', res.data.adminId);
        }
      })
      .catch(() => alert("Error Occurred"));
  };

  const nextStep = () => {
    let valid = true;

    // Validate fields based on the current step
    if (step === 1) {
      if (!formData.businessName.trim() || !formData.businessType.trim()) valid = false;
    } else if (step === 2) {
      if (!formData.gstNumber.trim() || !formData.panNumber.trim()) valid = false;
    } else if (step === 3) {
      if (!formData.companyEmail.trim() || !formData.businessAddress.trim()) valid = false;
    } else if (step === 4) {
      if (!formData.city.trim() || !formData.state.trim() || !formData.pincode.trim()) valid = false;
    }

    if (!valid) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="form-container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label>Business Name:</label>
            <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required />
            <label>Business Type:</label>
            <input type="text" name="businessType" value={formData.businessType} onChange={handleChange} required />
          </>
        )}

        {step === 2 && (
          <>
            <label>GST Number:</label>
            <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required />
            <label>PAN Number:</label>
            <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required />
          </>
        )}

        {step === 3 && (
          <>
            <label>Company Email:</label>
            <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} required />
            <label>Business Address:</label>
            <input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleChange} required />
          </>
        )}

        {step === 4 && (
          <>
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            <label>State:</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            <label>Pincode:</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
          </>
        )}

        {step === 5 && (
          <>
            <p>
              Please upload a PDF containing the following business documents:
              <li>GST Certificate</li>
              <li>PAN Card</li>
              <li>Company Registration Document</li>
            </p>
            <br />
            <label>Document Link/Path:</label>
            <input type="text" name="documentPath" value={formData.documentPath} onChange={handleChange} required />
          </>
        )}

        {/* Navigation Buttons */}
        <div style={{ marginTop: "20px" }}>
          {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {step < 5 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 5 && <button type="submit">SIGN UP</button>}
        </div>
      </form>
    </div>
  );
}
