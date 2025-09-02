import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/OrderHistoryPage.css'
import CustomerNavbar from './CustomerNavbar';
export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const cusId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/getDeliveredOrders', {
      params: { cusId }
    })
    .then((res) => {
      console.log(res.data);
      setOrders(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
    <CustomerNavbar/>
    <div className="order-history-container">
      <h3>Order History</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-details">
              <p><strong>Order Id:</strong> {order.id}</p>
              <p><strong>Order Time:</strong> {new Date(order.ordertime).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ₹{order.totAmount}</p>
              <p><strong>Payment ID:</strong> {order.paymentId || "Cash On Delivery"}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
            
            <div className="order-image-section">
              <img
                src="https://t4.ftcdn.net/jpg/01/31/29/83/360_F_131298355_UYqJjrQguvWwnYAZUw6rfqVvadakMU2h.jpg"
                alt="Order"
                className="order-image"
              />
              <button 
                onClick={() => navigate('/view_orders', { state: { orderId: order.id } })}
                className="view-more-btn"
              >
                View More
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};