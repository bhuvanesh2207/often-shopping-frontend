import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import "../style/Form.css";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Load cart from localStorage
  const savedItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const items = location.state?.items || savedItems;

  // Calculate total from cart if not provided
  const totalAmount =
    location.state?.total ||
    savedItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

  const [paymentMethod, setPaymentMethod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressLoading, setAddressLoading] = useState(true);

  const customerId = localStorage.getItem("id");

  // Fetch addresses
  useEffect(() => {
    if (!customerId) return;

    setAddressLoading(true);

    axios
      .get("http://localhost:8080/getAddress", { params: { customerId } })
      .then((res) => {
        const data = res.data || [];
        setAddresses(data);

        const newAddressId = location.state?.newAddressId;

        if (data.length > 0) {
          if (newAddressId && data.some((addr) => addr.id === newAddressId)) {
            setSelectedAddressId(newAddressId); // auto-select newly added
          } else if (
            !selectedAddressId ||
            !data.some((addr) => addr.id === selectedAddressId)
          ) {
            setSelectedAddressId(data[0].id); // fallback: first address
          }
        }

        if (!paymentMethod && data.length > 0) {
          setPaymentMethod("Cash On Delivery");
        }
      })
      .catch(() => alert("Failed to fetch addresses!"))
      .finally(() => setAddressLoading(false));
  }, [customerId, location]);

  // Remove address
  const handleRemoveAddress = (id) => {
    if (!window.confirm("Are you sure you want to remove this address?"))
      return;

    axios
      .get("http://localhost:8080/removeAddress", { params: { id } })
      .then(() => {
        setAddresses((prev) => {
          const updated = prev.filter((addr) => addr.id !== id);
          if (id === selectedAddressId) {
            setSelectedAddressId(updated.length > 0 ? updated[0].id : "");
          }
          return updated;
        });
      })
      .catch(() => alert("Failed to remove address."));
  };

  // Create order
  const createOrder = async (paymentId) => {
    const orderPayload = {
      customerId,
      address: selectedAddressId,
      items: items.map((item) => ({
        productId: item.productId || null,
        quantity: item.quantity || 1,
      })),
      totAmount: totalAmount,
      ordertime: new Date().toISOString(),
      paymentId,
    };

    try {
      await axios.post("http://localhost:8080/createOrder", orderPayload, {
        headers: { "Content-Type": "application/json" },
      });

      // Clear cart
      localStorage.removeItem("cart");

      alert("Order placed successfully!");
      navigate("/confirm_order");
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Order creation failed. Please try again.");
    }
  };

  // Handle payment
  const handlePayment = async () => {
    if (!selectedAddressId) return alert("Please select an address.");
    if (!paymentMethod) return alert("Please select a payment method.");
    if (!Array.isArray(items) || items.length === 0)
      return alert("Cart is empty!");

    if (paymentMethod === "Cash On Delivery") {
      await createOrder(null);
    } else if (paymentMethod === "Online Payment") {
      try {
        const res = await axios.post(
          "http://localhost:8080/create-order",
          null,
          { params: { amount: totalAmount } }
        );
        const order = res.data;

        if (!window.Razorpay) return alert("Razorpay SDK not loaded.");

        const options = {
          key: "rzp_test_dKctbPiOE97dPE",
          amount: order.amount,
          currency: "INR",
          name: "Your Store",
          description: "Payment",
          order_id: order.id,
          handler: async function (response) {
            await createOrder(response.razorpay_payment_id);
          },
          prefill: { email: localStorage.getItem("email") || "" },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Online payment setup failed:", error);
        alert("Payment process failed. Please try again.");
      }
    }
  };

  return (
    <>
      <CustomerNavbar />
      <div className="container">
        <h1>Checkout Page</h1>
        <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
        <Link to="/add_address">
          <button>Add Address</button>
        </Link>

        <h3>Select Shipping Address</h3>
        {addressLoading ? (
          <p>Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p>No saved addresses.</p>
        ) : (
          <div>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`address-card ${
                  selectedAddressId === addr.id ? "selected" : ""
                }`}
                onClick={() => setSelectedAddressId(addr.id)}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  cursor: "pointer",
                }}
              >
                <div>
                  <b>{addr.fullName}</b>
                </div>
                <div>
                  {addr.street}, {addr.city}
                </div>
                <div>
                  {addr.state} - {addr.pincode}
                </div>
                <div>Phone: {addr.phone}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveAddress(addr.id);
                  }}
                  disabled={addressLoading}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
          className="auth-form"
        >
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              name="payment"
              value="Cash On Delivery"
              checked={paymentMethod === "Cash On Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Cash On Delivery
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="payment"
              value="Online Payment"
              checked={paymentMethod === "Online Payment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Online Payment
          </label>
          <br />
          <button
            type="submit"
            disabled={totalAmount === 0 || !selectedAddressId}
          >
            Place Order
          </button>
        </form>

        <br />
        <Link to="/view_cart_page">
          <button>Back to Cart</button>
        </Link>
      </div>
    </>
  );
}
