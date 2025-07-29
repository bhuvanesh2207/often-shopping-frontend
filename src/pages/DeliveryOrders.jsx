import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import DeliveryPersonNavbar from './DeliveryPersonNavbar';
export default function DeliveryPerson() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState({});
  const deliveryEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveryOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getConfirmProduct", {
          params: { email: deliveryEmail }
        });

        const rawOrders = response.data || [];

        const enrichedOrders = await Promise.all(
          rawOrders.map(async (order) => {
            let address = {};
            try {
              const addressRes = await axios.get("http://localhost:8080/getAddressById", {
                params: { id: order.address }
              });
              address = addressRes.data;
            } catch {
              address = {
                street: "Unknown",
                city: "",
                state: "",
                pincode: "",
                phone: "N/A"
              };
            }

            return {
              orderId: order.orderId,
              orderDate: order.orderTime,
              totalAmount: order.totAmount,
              status: order.status,
              quantityOrdered: order.quantity,
              address,
              productName: order.productName,
              productImage: order.productImage
            };
          })
        );

        setOrders(enrichedOrders);
      } catch (error) {
        alert("Error fetching delivery orders: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (deliveryEmail) fetchDeliveryOrders();
  }, [deliveryEmail]);

  const updateOrderStatusLocally = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleOutForDelivery = async (orderId) => {
  setButtonDisabled(prev => ({ ...prev, [orderId + "_out"]: true }));

  try {
    await axios.get("http://localhost:8080/outForDelivered", {
      params: { orderId }
    });
    alert("Order is now out for delivery.");
    updateOrderStatusLocally(orderId, "Out for Delivery"); 
  } catch (error) {
    alert("Failed to update status to Out for Delivery");
    setButtonDisabled(prev => ({ ...prev, [orderId + "_out"]: false }));
  }
};


  const handleGenerateOtp = async (orderId) => {
    setButtonDisabled((prev) => ({ ...prev, [orderId + "_otp"]: true }));
    try {
      await axios.get("http://localhost:8080/deliveryOtp", {
        params: { id: orderId },
      });
      alert("OTP sent successfully.");
      updateOrderStatusLocally(orderId, "OTP Sent");
    } catch (err) {
      alert("Failed to generate OTP.");
      setButtonDisabled((prev) => ({ ...prev, [orderId + "_otp"]: false }));
    }
  };

  const handleVerifyOtp = (orderId) => {
    setButtonDisabled((prev) => ({ ...prev, [orderId + "_verify"]: true }));
    navigate("/customer_delievry_otp", { state: { orderId } });
  };

  const handleDelivered = async (orderId) => {
    setButtonDisabled((prev) => ({ ...prev, [orderId + "_delivered"]: true }));
    try {
      await axios.get("http://localhost:8080/delivered", {
        params: { orderId }
      });
      alert("Order delivered successfully.");
      updateOrderStatusLocally(orderId, "Delivered");
    } catch (error) {
      alert("Failed to mark order as delivered");
      setButtonDisabled((prev) => ({ ...prev, [orderId + "_delivered"]: false }));
    }
  };

  if (loading) return <div>Loading delivery orders...</div>;

  return (
    <>
      <DeliveryPersonNavbar/>
      <div className="container">
        <h2>Delivery Products</h2>
        <button><Link to="/delivery_person_change_pass">Reset Password</Link></button>
        {orders.length === 0 ? (
          <p>No ordered products found.</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '2rem',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '1rem'
                }}
              >
                <img
                  src={order.productImage?.startsWith("http") ? order.productImage : `data:image/jpeg;base64,${order.productImage}`}
                  alt={order.productName}
                  width="120"
                />
                <p><strong>Name:</strong> {order.productName}</p>
                <p><strong>Price:</strong> ₹{order.totalAmount}</p>
                <p><strong>Quantity Ordered:</strong> {order.quantityOrdered}</p>
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                {order.address && (
                  <>
                    <p><strong>Phone Number:</strong> {order.address.phone}</p>
                    <p><strong>Delivery Address:</strong> {[order.address.street, order.address.city, order.address.state, order.address.pincode].filter(Boolean).join(', ')}</p>
                  </>
                )}

                <p><strong>Status:</strong> {order.status}</p>

                <button
                  onClick={() => handleOutForDelivery(order.orderId)}
                >
                  OUT FOR DELIVERY
                </button>

                <button
                  onClick={() => handleGenerateOtp(order.orderId)}
                  disabled={order.status !== "Out for Delivery" || buttonDisabled[order.orderId + "_otp"]}
                >
                  SEND OTP
                </button>

                <button
                  onClick={() => handleVerifyOtp(order.orderId)}
                  disabled={order.status !== "OTP Sent" || buttonDisabled[order.orderId + "_verify"]}
                >
                  VERIFY OTP
                </button>

                <button
                  onClick={() => handleDelivered(order.orderId)}
                  disabled={order.status !== "Out for Delivery" || buttonDisabled[order.orderId + "_delivered"]}
                >
                  DELIVERED
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
