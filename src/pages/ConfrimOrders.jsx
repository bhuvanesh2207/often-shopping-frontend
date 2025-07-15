import React from 'react';
import { Link} from 'react-router-dom';

export default function ConfrimOrders() {

  return (
    <div style={{textAlign: 'center', marginTop: 40}}>
      <h2>Thank you for shopping with us!</h2>
      <h3>Your order has been placed successfully 🎉</h3>
      <p>We'll send you a confirmation email soon.</p>
      <br />

      <Link to='/'>
        <button>Go to Homepage</button>
      </Link>
      <Link to='/view_orders' style={{marginLeft: 10}}>
        <button>View My Orders</button>
      </Link>
      <Link to='/customer_page' style={{marginLeft: 10}}>
        <button>Shop More</button>
      </Link>
    </div>
  );
}
