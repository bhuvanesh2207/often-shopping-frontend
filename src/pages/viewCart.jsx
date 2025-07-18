import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const calculateTotal = (items = []) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export default function ViewCart() {
  const [email] = useState(localStorage.getItem('email') || '');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  console.log("items:", JSON.stringify(items, null, 2));
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
      <h2>{email}'s Shopping Cart</h2>
      {items.map((item) => (
        <div key={item.productId} className="cart-item">
          <img src={item.productImage} alt={item.productName} />
          <div>
            <h3>{item.productName}</h3>
            <div>
              <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
              {item.quantity}
              <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
            </div>
            <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button onClick={() => handleDeleteCart(item.id)}>Delete</button>
        </div>
      ))}
      <h3>Total: ₹{total.toFixed(2)}</h3>
      <Link to="/customer_page"><button>Continue Shopping</button></Link>
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
}
