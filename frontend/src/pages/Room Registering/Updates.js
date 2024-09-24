import React from 'react';
import '../../css/Auth.css';
import { Link } from 'react-router-dom';

const Confirmation= () => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h1>Data Updated</h1>
        <p>Thanks for your contribution</p>
         <Link to='/Myrooms' >Return to home</Link>
      </div>
    </div>
  );
};

export default Confirmation;