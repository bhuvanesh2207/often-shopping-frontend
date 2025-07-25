import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderedProduct() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerId = localStorage.getItem('id');

  useEffect(() => {
    const fetchOrderedProducts = async () => {
      try {
        // 1. Fetch raw ordered products
        const res = await axios.get("http://localhost:8080/getOrderedProducts", {
          params: { id: customerId }
        });

        const rawOrders = res.data || [];

        // 2. For each order, fetch its address using addressId
        const enrichedOrders = await Promise.all(
          rawOrders.map(async (order) => {
            let address = null;
            try {
              const addrRes = await axios.get("http://localhost:8080/getAddressById", {
                params: { id: order.address }
              });
              address = addrRes.data;
            } catch (err) {
              address = { street: "Unknown", city: "", state: "", pincode: "" };
            }

            return { ...order, address };
          })
        );

        setOrders(enrichedOrders);
      } catch (error) {
        alert("Failed to fetch orders: " + error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchOrderedProducts();
  }, [customerId]);

  const handleConfirm = async (orderId) => {
  try {
    await axios.get("http://localhost:8080/confirmOrder", {
      params: { id: orderId }
    });
    alert("Order Confirmed Successfully..!!");
  } catch (err) {
    alert("Order Confirmation Failed.");
  }
};

  if (loading) return <div>Loading ordered products...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Ordered Products</h2>
      {orders.length === 0 ? (
        <p>No ordered products found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <img
                src={order.productImage?.startsWith("http") ? order.productImage : `data:image/jpeg;base64,${order.productImage}`}
                alt={order.productName}
                width="120"
              />
              <p><strong>Name:</strong> {order.productName}</p>
              <p><strong>Price:</strong> ₹{order.price}</p>
              <p><strong>Quantity Ordered:</strong> {order.quantityOrdered}</p>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>

              {order.address && (
                <>
                <p><strong>PhoneNumber: </strong>{[order.address.phone]}</p>
                <p><strong>Delivery Address:</strong> {[order.address.street, order.address.city, order.address.state, order.address.pincode].filter(Boolean).join(', ')}</p>
                </>
              )}
              <button onClick={() => handleConfirm(order.orderId)}>CONFIRM</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
