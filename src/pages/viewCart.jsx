import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
        productImage: item.productImage
          ? `http://localhost:8080${item.productImage}`
          : 'https://via.placeholder.com/60',
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
      .get('http://localhost:8080/deleteCart', { params: { id } })
      .then(() => {
        alert('Deleted Successfully');
        fetchCart();
      })
      .catch((err) => {
        alert('Sorry, Error Occurred: ' + err);
      });
  };

  const updateQuantity = (item, newQty) => {
    if (newQty < 1) return; // prevent less than 1

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

  return (
    <div>
      <div className="container">
      <h2>{email}'s Shopping Cart</h2>
      {items.map(item => (
        <div key={item.productId} className="cart-item">
          <img src={item.productImage} alt={item.productName} />
          <div className="cart-item-details">
            <h3>{item.productName}</h3>
            <div className="cart-controls">
              <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
              {item.quantity}
              <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
            </div>
            <p><strong>Subtotal:</strong> ₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button onClick={() => handleDeleteCart(item.id)}>Delete</button>
        </div>
      ))}
      <div className="cart-summary">Total: ₹{total.toFixed(2)}</div>
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <Link to="/customer_page"><button>Continue Shopping</button></Link>
        <button onClick={() => navigate('/checkout',{state:{total}})} disabled={!items.length}>
          Proceed to Checkout
        </button>
      </div>
    </div>
    </div>
  );
}
