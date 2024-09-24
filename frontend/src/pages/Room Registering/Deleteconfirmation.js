import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/Auth.css';
//import { Link } from 'react-router-dom';
import axios from 'axios';
const ConfirmDeletion= () => {
    const {id}=useParams();
    const Nav=useNavigate();
    const handleNo=(e)=>{
        e.preventDefault()
        Nav('/Myrooms')
    }
    const handleYes=(e)=>{
        e.preventDefault()
        axios.delete(`http://localhost:3000/Home/DeleteHome/${id}`)
        .then(result=>{
            Nav('/Myrooms')
        })
        .catch(err=>console.log(err.message))
    }
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h1>Be Aware</h1>
        <p>Are you sure want to delete?</p>
         <button style={{marginRight:'12px'}}onClick={handleYes}>Yes</button>
         <button onClick={handleNo}>No</button>
      </div>
    </div>
  );
};

export default  ConfirmDeletion;