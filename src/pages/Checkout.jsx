import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const totalAmount = Number(location.state?.total) || 0;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressLoading, setAddressLoading] = useState(true);

  const customerId = localStorage.getItem('id');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    if (customerId) {
      setAddressLoading(true);
      axios.get('http://localhost:8080/getAddress', {
        params: { customerId }
      })
      .then(res => {
        //Load all addresses 
        const addressList = res.data;
        //Save the addresses to state
        setAddresses(addressList);

        //select the first one by default
        if (addressList.length > 0) {
          const firstAddressId = addressList[0].id;
          setSelectedAddressId(firstAddressId);
        }
      })
      .catch(() => alert("Failed to fetch addresses!"))
      .finally(() => setAddressLoading(false));
    }
  }, [customerId]);


    // Remove a single address
    const handleRemoveAddress = (id) => {
      if (!window.confirm("Are you sure you want to remove this address?")) return;

      axios.get('http://localhost:8080/removeAddress', {
        params: { id }
      })
      .then(() => {
        setAddresses(prev => {
          const updatedAddresses = prev.filter(addr => addr.id !== id);
          if (selectedAddressId === id) {
            if (updatedAddresses.length > 0) {
              setSelectedAddressId(updatedAddresses[0].id);
            } else {
              setSelectedAddressId("");
            }
          }
          return updatedAddresses;
        });
      })
      .catch(() => alert('Failed to remove address.'));
    };


  const handlePayment = async () => {
    if (!selectedAddressId) {
      alert("Please select a shipping address!");
      return;
    }
    if (!paymentMethod) {
      alert("Select the Payment Method");
      return;
    }

    if (paymentMethod === "Cash On Delivery") {
      navigate('/confrim_order');
    } else if (paymentMethod === "Online Payment") {
      try {
        const response = await axios.post(
          "http://localhost:8080/create-order",
          null,
          { params: { amount: totalAmount } }
        );
        const order = response.data;
        if (!window.Razorpay) {
          alert("Razorpay SDK not loaded. Please try again later.");
          return;
        }

        const options = {
          key: "rzp_test_dKctbPiOE97dPE",
          amount: order.amount,
          currency: "INR",
          name: "OftenShopping",
          description: "Order Payment",
          order_id: order.id,
          handler: function (response) {
            axios.post("http://localhost:8080/savePayment", {
              customerId,
              email,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              addressId: selectedAddressId,
              amount: totalAmount,
            })
            .then(() => {
              alert("Payment Successful.");
              axios.get("http://localhost:8080/removeAfterPay", {
                params: { customerId }
              });
              navigate('/confrim_order');
            })
            .catch(() => {
              alert("Payment record save failed!");
            });
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (error) {
        console.error("Failed to create order:", error);
        alert("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
      <Link to="/add_address"><button>Add Address</button></Link>
      
      <h3>Select Shipping Address</h3>

        {addressLoading ? (
          <div>Loading addresses...</div>
        ) : addresses.length === 0 ? (
          <div>No saved addresses found.</div>
        ) : (
          <div className="address-list">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className={`address-card${selectedAddressId === addr.id ? " selected" : ""}`}
                onClick={() => setSelectedAddressId(addr.id)}
              >
                <div><b>{addr.fullName}</b></div>
                <div>{addr.street}, {addr.city}</div>
                <div>{addr.state} - {addr.pincode}</div>
                <div>Phone: {addr.phone}</div>
                <button
                  className="remove-btn"
                  onClick={e => { e.stopPropagation(); handleRemoveAddress(addr.id); }}
                  disabled={addressLoading}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}



      <form onSubmit={e => { e.preventDefault(); handlePayment(); }}>
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Cash On Delivery"
            checked={paymentMethod === "Cash On Delivery"}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          Cash On Delivery
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Online Payment"
            checked={paymentMethod === "Online Payment"}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          Online Payment
        </label>
        <br />
        <button
          type="submit"
          disabled={totalAmount === 0 || addresses.length === 0}
        >
          Make Payment
        </button>
      </form>

      <br />
      <Link to="/view_cart_page"><button>Back to Cart</button></Link>
    </div>
  );
}
