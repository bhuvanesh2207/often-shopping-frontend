import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewOrders() {
  const customerId = localStorage.getItem("id"); // Adjust as per your auth logic
  console.log(customerId)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      axios.get("http://localhost:8080/listOfOrders", { params: { id: customerId } })
        .then(res => setOrders(res.data))
        .catch(() => alert("Failed to load your orders."))
        .finally(() => setLoading(false));
    }
  }, [customerId]);

  if (loading) return <div>Loading orders...</div>;
  if (!orders.length) return <div>No orders found!</div>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order.id} style={{border: "1px solid #aaa", margin: "10px 0", padding: "8px"}}>
          <div><strong>Order ID:</strong> {order.id}</div>
          <div><strong>Date:</strong> {(order.ordertime || "").slice(0,19).replace("T", " ")}</div>
          <div><strong>Payment ID:</strong> {order.paymentId || "Cash On Delivery"}</div>
          <div><strong>Total Amount:</strong> ₹{order.totAmount}</div>
          <div><strong>Address:</strong> {order.address || order.addressId}</div>
          <strong>Items:</strong>
          <ul>
            {order.items && order.items.map((item, idx) => (
              <li key={idx}>Product ID: {item.productId}, Quantity: {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
