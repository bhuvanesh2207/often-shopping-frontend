import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

export const calculateTotal = (items = []) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export default function ViewCart() {
  const [email] = useState(localStorage.getItem('email') || '');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:8080/viewCart', {
        params: { email },
      });

      const processedItems = res.data.map((item) => ({
        ...item,
        productImage: item.productImage?.startsWith('http')
          ? item.productImage
          : `http://localhost:8080${item.productImage || ''}`,
      }));

      setItems(processedItems);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [email]);

  const handleDeleteCart = (id) => {
    axios
      .get('http://localhost:8080/deleteCartItem', { params: { id } })
      .then(() => {
        alert('Deleted Successfully');
        fetchCart();
      })
      .catch((err) => {
        alert('Sorry, Error Occurred: ' + err);
      });
  };

  const updateQuantity = (item, newQty) => {
    if (newQty < 1) return;

    const payload = {
      email,
      prod: { id: item.productId },
      quantity: newQty,
    };

    axios
      .post('http://localhost:8080/updateCartItem', payload)
      .then(() => fetchCart())
      .catch((err) => console.error('Update cart failed:', err));
  };

  const total = calculateTotal(items);

  const handleProceedToCheckout = () => {
    if (!items.length) {
      alert('Your cart is empty.');
      return;
    }
    navigate('/checkout', { state: { total, items } });
  };

  return (
    <div className="container">
      <CustomerNavbar/>
      <h2>{email}'s Shopping Cart</h2>
      {items.map((item) => (
        <div key={item.productId} className="cart-item">
          <div className="cart-img-name">
            <img
              src={item.productImage || 'https://via.placeholder.com/120'}
              alt={item.productName}
              className="product-image"
            />
          </div>

          <div className="cart-details">
            <Link to={`/product/${item.productId}`} className="product-name">
              {item.productName}
            </Link>
            {/* Feel free to add product-description lines here */}
            {/* <p className="product-description">In Stock</p> */}
            {/* <p className="product-description">Color: Black</p> */}

            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
            </div>

            <div className="cart-actions">
              {/* Using anchor tag styled links for actions */}
              <button
                className="delete-link" 
                onClick={() => handleDeleteCart(item.id)}
                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#007185'}}
              >
                Delete
              </button>
              {/* Add other actions like save for later/compare if you want */}
            </div>
          </div>

          <div className="product-price">
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      <h3 className="cart-subtotal-summary">
        Total: <strong>₹{total.toFixed(2)}</strong>
      </h3>

      <Link to="/customer_page">
        <button>Continue Shopping</button>
      </Link>
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
}
