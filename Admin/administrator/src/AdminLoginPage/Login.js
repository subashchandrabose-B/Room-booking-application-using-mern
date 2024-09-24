import React, { useState } from 'react';
import './Login.css';
import { SecretKey } from '../Data';
import { useNavigate } from 'react-router';

const Login = () => {
  const [secretKey, setSecretKey] = useState(""); // State for secret key
  const Nav=useNavigate();
  const handleAccess = async (e) => {
    e.preventDefault();
    if(SecretKey===secretKey){
      localStorage.setItem('Admin', JSON.stringify("ACCESS-GRANTED"));
      Nav("/AdminHome")
    }
    else{
      alert("invalid SECRET-KEY")
    }
  };
  return (
    <div className="Login">
      <div className='LoginBackground'> 
        <form className="loginForm" onSubmit={handleAccess}>
          <label style={{color:"Black"}}>Enter the secret Key:</label>
          <input
            onChange={(e) => setSecretKey(e.target.value)}
            value={secretKey}
            className="secreteKey"
          />
          <button type="submit">Get Access</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
