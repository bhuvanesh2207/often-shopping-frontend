import React from 'react';
import '../style/TrackOrder.css';
import { useLocation } from 'react-router-dom';
import DeliveryPersonNavbar from './DeliveryPersonNavbar';

const statusSteps = ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered'];

export default function TrackOrderStatus() {
  const location = useLocation();
  const currentStatus = location.state?.status || 'Pending'; // default fallback
  const currentIndex = statusSteps.indexOf(currentStatus);

  const progressValue = currentIndex >= 0 ? currentIndex : 0;

  return (
    <>
      <DeliveryPersonNavbar/>
      <div className="tracker-container">
        <h2>Shipment Tracking</h2>
        <h3>Current Status: {currentStatus}</h3>

        <div
          className="tracker-steps"
          style={{ '--progress': `${progressValue}` }}
        >
          <div className="tracker-line"></div>

          {statusSteps.map((step, index) => (
            <div className="tracker-step" key={step}>
              <div className={`circle ${index <= currentIndex ? 'active' : ''}`}>
                {index + 1}
              </div>
              <div className={`label ${index <= currentIndex ? 'active' : ''}`}>
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
