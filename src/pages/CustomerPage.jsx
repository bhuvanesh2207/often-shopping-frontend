// src/pages/Customer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

export default function Customer() {
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const passedKeyword = location.state?.keyword || '';

  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || '';
    setEmail(storedEmail);
    fetchProducts();

    if (passedKeyword) {
      setQuery(passedKeyword);
      searchKeyword(passedKeyword);
      setShowSuggestions(false); // Disable dropdown if keyword is from homepage
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/viewAllProducts');
      setProducts(res.data);
      const q = {};
      res.data.forEach((p) => (q[p.id] = 1));
      setQuantities(q);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleQuantityChange = (pid, val) => {
    const v = Math.max(1, parseInt(val, 10) || 1);
    setQuantities((prev) => ({ ...prev, [pid]: v }));
  };

  const handleCart = async (prod) => {
    const payload = {
      customerEmail: email,
      productId: prod.id,
      quantity: quantities[prod.id] || 1,
    };

    try {
      await axios.post('http://localhost:8080/addToCart', payload);
      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert('Failed to add to cart.');
    }
  };

  const searchKeyword = async (keyword) => {
    try {
      const res = await axios.get('http://localhost:8080/searchProduct', {
        params: { keyword },
      });
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);
    searchKeyword(value);
  };

  const handleSelect = (product) => {
    setQuery(product.productName);
    setResults([]);
    setShowSuggestions(false);
  };

  const displayedProducts = query.length > 0 ? results : products;

  return (
    <div>
      <CustomerNavbar />
      <h2>Welcome {email}</h2>
      <div>
        <button onClick={() => navigate('/view_cart_page')}>View Cart</button>
        <Link to="/profile_page">
          <button>Profile</button>
        </Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleInputChange}
        />
        {results.length > 0 && showSuggestions && (
          <ul>
            {results.map((p) => (
              <li key={p.id} onClick={() => handleSelect(p)}>
                {p.productName} - {p.brand}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="product-list">
        {displayedProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <div className="product-image">
              <img src={p.productImage} alt={p.productName} width="150" />
            </div>
            <div className="product-details">
              <h3>{p.productName}</h3>
              <p><strong>Brand:</strong> {p.brand}</p>
              <p><strong>Category:</strong> {p.category}</p>
              <p><strong>Description:</strong> {p.description}</p>
              <p><strong>Ratings:</strong> ⭐ {p.ratings.toFixed(1)}</p>
              <p><strong>Price:</strong> ₹{p.price.toFixed(2)}</p>
              <p><strong>Discount:</strong> {p.discount}% OFF</p>
              <p><strong>Final Price:</strong> ₹{p.finalPrice.toFixed(2)}</p>
              <p><strong>Available Qty:</strong> {p.quantity}</p>

              <div className="action-row">
                <label>Qty: </label>
                <input
                  type="number"
                  min="1"
                  value={quantities[p.id] || 1}
                  onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                />
                <button onClick={() => handleCart(p)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
