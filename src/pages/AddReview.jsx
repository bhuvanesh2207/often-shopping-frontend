import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddReview() {
  const location = useLocation();
  const navigate = useNavigate();

  const { productId } = location.state || {};

  const [formData, setFormData] = useState({
    productId: productId || '', // fallback in case state is missing
    reviewerName: '',
    comment: '',
    rating: ''
  });

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
    <div className="add-review-form">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="productId" value={formData.productId} />

        <div>
          <label>Reviewer Name:</label>
          <input
            type="text"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
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
          <label>Rating (1–5):</label>
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
  );
}
