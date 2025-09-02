import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderedProduct() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrderedProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/getOrderedProducts",
          {
            params: { id: customerId },
          }
        );

        const rawOrders = res.data || [];

        // enrich orders only with address (status already comes from backend)
        const enrichedOrders = await Promise.all(
          rawOrders.map(async (order) => {
            let address = null;
            try {
              const addrRes = await axios.get(
                "http://localhost:8080/getAddressById",
                {
                  params: { id: order.address },
                }
              );
              address = addrRes.data;
            } catch {
              address = {
                street: "Unknown",
                city: "",
                state: "",
                pincode: "",
              };
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
        params: { id: orderId },
      });

      alert("Order Confirmed Successfully..!!");

      // ✅ update local state immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "CONFIRMED" } : order
        )
      );
    } catch {
      alert("Order Confirmation Failed.");
    }
  };

  if (loading) return <div>Loading ordered products...</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Ordered Products</h2>
      {orders.length === 0 ? (
        <p>No ordered products found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li
              key={index}
              style={{
                marginBottom: "2rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "1rem",
              }}
            >
              <img
                src={
                  order.productImage?.startsWith("http")
                    ? order.productImage
                    : `data:image/jpeg;base64,${order.productImage}`
                }
                alt={order.productName}
                width="120"
              />
              <p>
                <strong>Name:</strong> {order.productName}
              </p>
              <p>
                <strong>Price:</strong> ₹{order.price}
              </p>
              <p>
                <strong>Quantity Ordered:</strong> {order.quantityOrdered}
              </p>
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong> {order.status}
              </p>

              {order.address && (
                <>
                  <p>
                    <strong>PhoneNumber: </strong>
                    {order.address.phone}
                  </p>
                  <p>
                    <strong>Delivery Address:</strong>{" "}
                    {[
                      order.address.street,
                      order.address.city,
                      order.address.state,
                      order.address.pincode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </>
              )}
              <button
                onClick={() => handleConfirm(order.orderId)}
                disabled={order.status === "CONFIRMED"}
              >
                {order.status === "PENDING" ? "CONFIRM" : "CONFIRMED"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
