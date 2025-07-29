import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Form.css';
import CustomerNavbar from './CustomerNavbar';

export default function AddReview() {
  const location = useLocation();
  const navigate = useNavigate();

  const { productId } = location.state || {};

  const [formData, setFormData] = useState({
    productId: productId || '', 
    reviewerName: '',
    comment: '',
    rating: ''
  });

  const reviewRef = useRef(null);
  useEffect(() => {
    if (reviewRef.current) reviewRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/addReview", formData);
      alert("Review submitted successfully!");
      navigate("/view_orders"); // replace with your actual route
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <>
    <CustomerNavbar/>
    <div className="container">
      <form onSubmit={handleSubmit} className="auth-form">
         <h2>Add Review</h2>
        <input type="hidden" name="productId" value={formData.productId} />

        <div>
          <label>Reviewer Name:</label>
          <input
            type="text"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
            ref={reviewRef}
            required
          />
        </div>

        <div>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            
          />
        </div>

        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
    </>
  );
}
