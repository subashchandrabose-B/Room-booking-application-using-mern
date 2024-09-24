import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../../css/Auth.css';
import { Link } from 'react-router-dom';

const Confirmation= () => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h1>Booking Confirmed!</h1>
        <p>Your booking has been successfully confirmed.</p>
         <Link to='/'>Return to Home</Link>
      </div>
    </div>
  );
};

export default Confirmation;

