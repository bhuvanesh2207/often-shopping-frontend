  // src/pages/Customer.jsx
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import {Link} from 'react-router-dom';

  export default function Customer() {
    const [email, setEmail] = useState('');
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const storedEmail = localStorage.getItem('email') || '';
      setEmail(storedEmail);
      fetchProducts();
    }, []);

    const fetchProducts = () => {
      axios
        .get('http://localhost:8080/viewAllProducts')
        .then(res => {
          setProducts(res.data);
          const q = {};
          res.data.forEach(p => (q[p.id] = 1));
          setQuantities(q);
        })
        .catch(err => console.error('Failed to fetch products:', err));
    };

    const handleQuantityChange = (pid, val) => {
      const v = Math.max(1, parseInt(val, 10) || 1);
      setQuantities(q => ({ ...q, [pid]: v }));
    };

    const handleCart = (prod) => {
      const payload = {
        customerEmail: email,
        productId: prod.id,
        quantity: quantities[prod.id] || 1,
      };

      axios
        .post('http://localhost:8080/addToCart', payload)
        .then(() => alert('Added to cart!'))
        .catch(err => {
          console.error('Add to cart failed:', err);
          alert("Failed to add to cart. See console for details.");
        });
    };

    const handleInputChange = async (e) => {
  const value = e.target.value;
  setQuery(value);

  if (value.trim().length === 0) {
    setResults([]);
    return;
  }

  try {
    const res = await axios.get("http://localhost:8080/searchProduct", {
      params: { keyword: value }
    });
    setResults(res.data);
  } catch (err) {
    console.error("Search failed:", err);
  }
};

const handleSelect = (product) => {
  setQuery(product.productName);
  setResults([]); // Hide dropdown after selection
  setResults([product]); // Show only selected product in list (optional)
};


    const displayedProducts = query.length > 0 ? results : products;

    return (
      <div>
        <h2>Welcome {email}</h2>
        <button onClick={() => navigate('/view_cart_page')}>View Cart</button>
        <Link to="/profile_page"><button>Profile</button></Link>
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleInputChange}
          />

          {/* Show dropdown only if results are available */}
          {results.length > 0 && (
            <ul>
              {results.map((p) => (
                <div key={p.id} onClick={() => handleSelect(p)}>
                  {p.productName} - {p.brand}
                </div>
              ))}
            </ul>
          )}
        </div>

        <div className="product-list">
        {displayedProducts.map(p => (
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
