import axios from 'axios';
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {useState} from 'react';
export default function Checkout() {
  const location = useLocation();
  const totalAmount = Number(location.state?.total) || 0;
  const [paymentMethod,setPaymentMethod] = useState("")
  const navigate = useNavigate();
  const handlePayment = async (paymentMethod) => {

    if (paymentMethod === "Cash On Delivery"){
        navigate('/confrim_order')
    } 
    else if (paymentMethod === "Online Payment"){
    try {
      // Call backend to create order
      const response = await axios.post(
        "http://localhost:8080/create-order",
        null,
        { params: { amount: totalAmount } }
      );

      const order = response.data;
      console.log("Order created:", order);

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please try again later.");
        return;
      }
    
      // Razorpay payment options
      const options = {
        key: "rzp_test_dKctbPiOE97dPE",  // your Razorpay test key
        amount: order.amount,             // in paise
        currency: "INR",
        name: "OftenShopping",
        description: "Order Payment",
        order_id: order.id,               // order id from backend
        handler: function () {
          navigate('/confrim_order')
          
        },
        theme: {
          color: "#3399cc"
        }
      }
    
      // Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Payment failed. Please try again.");
    }
  } else {
    alert("Select the Payment Method");
  }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>

      <label>Enter Address:</label><br />
      <input type="text" name="address" required/><br /><br />
      <form>
      <label>Payment Method</label><br />

        <input
          type="radio"
          name="paymentMethod"
          value="Cash On Delivery"
          checked={paymentMethod === "Cash On Delivery"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label>Cash On Delivery</label>
        <br />

        <input
          type="radio"
          name="paymentMethod"
          value="Online Payment"
          checked={paymentMethod === "Online Payment"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label>Online Payment</label>
        <br />
        <button onClick={e => {e.preventDefault(); handlePayment(paymentMethod);}} disabled={totalAmount === 0}>Make Payment</button><br />
      </form>
      <Link to="/view_cart_page"><button>Back to Cart</button></Link>
    </div>
  );
}
