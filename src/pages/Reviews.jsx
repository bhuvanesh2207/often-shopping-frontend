import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Reviews() {
  const location = useLocation();
  const productId = location.state?.productId; 

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (productId) {
      axios
        .get("http://localhost:8080/listOfReview", {
          params: { productId: productId },
        })
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Failed to fetch reviews", err));
    }
  }, [productId]);

  const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }
  return stars;
};

  return (
    <div>
      <h2>Reviews for Product </h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
          >
            <h4>{review.reviewerName}</h4>
            <p><strong>Rating:</strong> {renderStars(review.rating)} ({review.rating}/5)</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
