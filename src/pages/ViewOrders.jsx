import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import CustomerNavbar from './CustomerNavbar';

export default function ViewOrders() {
  const customerId = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      const fetchOrders = async () => {
        try {
          const ordersRes = await axios.get("http://localhost:8080/listOfOrders", {
            params: { id: customerId }
          });
          const rawOrders = ordersRes.data || [];

          const allProductIds = rawOrders
            .flatMap(order => order.items || [])
            .map(item => item.productId);

          const uniqueProductIds = [...new Set(allProductIds)];

          const productRes = await axios.get("http://localhost:8080/getProductById", {
            params: { id: uniqueProductIds },
            paramsSerializer: params => qs.stringify(params, { indices: false })
          });

          const productMap = {};
          productRes.data.forEach(product => {
            productMap[product.id] = product;
          });

          const enrichedOrders = await Promise.all(
            rawOrders.map(async (order) => {
              let address = null;
              try {
                const addrRes = await axios.get("http://localhost:8080/getAddressById", {
                  params: { id: order.address }
                });
                address = addrRes.data;
              } catch {
                address = { street: "Unknown", city: "", state: "", pincode: "" };
              }

              const itemsWithDetails = (order.items || []).map(item => {
                const product = productMap[item.productId] || {};
                const imageUrl = product.productImage?.startsWith("http")
                  ? product.productImage
                  : `data:image/jpeg;base64,${product.productImage}`;

                return {
                  ...item,
                  name: product.productName || "Unknown Product",
                  brand: product.brand || "",
                  category: product.category || "",
                  description: product.description || "",
                  price: product.price || 0,
                  discount: product.discount || 0,
                  finalPrice: product.finalPrice || product.price || 0,
                  image: product.productImage ? imageUrl : "https://via.placeholder.com/150"
                };
              });

              return { ...order, address, items: itemsWithDetails };
            })
          );

          setOrders(enrichedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
          alert("Failed to load your orders.");
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [customerId]);

  if (loading) return <div>Loading orders...</div>;
  if (!orders.length) return <div>No orders found!</div>;

  return (
    <div className="view-orders">
      <CustomerNavbar />
      <h2>Your Orders</h2>
      {orders.map((order, index) => (
        <div className="order-card" key={index}>
          <h3>Order #{index + 1}</h3>
          <div className="order-info">
            <p><strong>Order Time:</strong> {new Date(order.ordertime).toLocaleString()}</p>
            <p><strong>Payment ID:</strong> {order.paymentId || "Cash On Delivery"}</p>
            <p><strong>Total Amount:</strong> ₹{order.totAmount?.toFixed(2)}</p>
            {order.address && (
              <p><strong>Address:</strong> {[order.address.street, order.address.city, order.address.state, order.address.pincode].filter(Boolean).join(', ')}</p>
            )}
          </div>

          <h4>Items:</h4>
          {order.items.length ? (
            <div className="items-grid">
              {order.items.map((item, i) => (
                <div className="item-card" key={i}>
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <p className="item-name">Name: {item.name}</p>
                    {item.brand && <p><strong>Brand: </strong>{item.brand}</p>}
                    <p><strong>Quantity: </strong>{item.quantity}</p>
                    <div className="price-section">
                      <span>₹{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items found for this order.</p>
          )}
        </div>
      ))}
    </div>
  );
}
