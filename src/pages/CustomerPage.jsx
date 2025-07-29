import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import '../style/CustomerPage.css';

export default function Customer() {
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [results, setResults] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hoveredProductId, setHoveredProductId] = useState(null); // ✅ NEW STATE
  const [alreadyHovered, setAlreadyHovered] = useState({}); // ✅ NEW STATE

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
      setShowSuggestions(false);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/viewAllProducts');

      const productsWithFinalPrice = res.data.map(p => ({
        ...p,
        finalPrice: Number((p.price * (1 - (p.discount || 0) / 100)).toFixed(2)),
      }));
      setProducts(productsWithFinalPrice);

      const q = {};
      productsWithFinalPrice.forEach(p => (q[p.id] = 1));
      setQuantities(q);

      const avgObj = {};
      for (let p of productsWithFinalPrice) {
        const avg = await fetchAvgRating(p.id);
        avgObj[p.id] = avg;
      }
      setAvgRatings(avgObj);

    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const fetchAvgRating = async (productId) => {
    try {
      const res = await axios.get('http://localhost:8080/avgReview', {
        params: { productId },
      });
      return parseFloat(res.data).toFixed(1);
    } catch (err) {
      console.error('Failed to fetch avg rating:', err);
      return '0.0';
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

  const handelReview = (id) => {
    navigate('/product_reviews', { state: { productId: id } });
  };

  const displayedProducts = query.length > 0 ? results : products;

  return (
    <>
      <CustomerNavbar />
      <div className="container">
        <h2>Welcome {email}</h2>
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
            <div
              className="product-card"
              key={p.id}
              onMouseEnter={() => {
                if (!alreadyHovered[p.id]) {
                  setHoveredProductId(p.id);
                  setAlreadyHovered(prev => ({ ...prev, [p.id]: true }));
                }
              }}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <div className="product-image">
                <img src={p.productImage} alt={p.productName} />
              </div>
              <div className="product-details">
                <h3>{p.productName}</h3>
                <p><strong>Brand:</strong> {p.brand}</p>
                <p><strong>Category:</strong> {p.category}</p>
                <p><strong>Description:</strong> {p.description}</p>
                <p><strong>Ratings:</strong> ⭐ {avgRatings[p.id] || '0.0'}</p>
                <div className="price-section">
                  <div className="discount-badge">-{p.discount}%</div>
                  <div className="final-price">₹{(p.finalPrice)}</div>
                  <div className="original-price">List Price: <s>₹{(p.price)}</s></div>
                </div>

                <div className="action-row">
                  <label>Qty: </label>
                  <input
                    type="number"
                    min="1"
                    className="quantity-input"
                    value={quantities[p.id] || 1}
                    onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                  />
                  <button onClick={() => handelReview(p.id)}>Reviews</button>
                  <button onClick={() => handleCart(p)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
