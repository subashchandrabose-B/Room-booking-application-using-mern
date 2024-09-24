import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import '../../css/Auth.css';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../commonPages/Context';

const Bookings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [days, setDays] = useState(1);
  const [price, setPrice] = useState(0);
  const [rent, setRent] = useState(0);
  const [image, setImage] = useState("");
  const { selectedDate } = useContext(UserContext); // Removed unused setSelectedDate
  const { id } = useParams();
  const navigate = useNavigate();
  const userAuth = JSON.parse(localStorage.getItem('user'))._id;
  useEffect(() => {
    const fetchHomeData = async () => {
      try{
        if(id){
          const result = await axios.get(`http://localhost:3000/Home/getHome/${id}`);
          setRent(result.data.price);
          setImage(result.data.image);
        }
      }catch(err){
        console.error("Error fetching home data", err);
      }
    };
    fetchHomeData();
  }, [id]);
  useEffect(() => {
    setPrice(days * rent);
  }, [days, rent]);

  const updateAvailableDates = async () => {
    try {
      if (id) {
        const requestData = { selectedDate, days };
        await axios.put(`http://localhost:3000/Home/updateDates/${id}`, requestData);
        console.log("Dates updated successfully");
      }
    } catch (err) {
      console.error("Error updating dates",err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingResult = await axios.post('http://localhost:3000/booking/confirm', {
        name,
        email,
        days,
        price,
        selectedDate,
        userAuth,
        image
      });
      console.log("Booking confirmed", bookingResult.data);
      if(bookingResult.data){
        navigate('/Confirm');
        await updateAvailableDates();
      }

      const templateParams = { name, email, days, price };
      const emailResponse = await emailjs.send('service_mzm96fm', 'template_4j00qli', templateParams, 'EpeB5yDPAKKpw8v7o');

      console.log('Email successfully sent!', emailResponse.status, emailResponse.text);
    } catch (err) {
      console.error("Error in booking or sending email", err.response ? err.response.data : err.message);
    }
  };
  return (
    <div className="booking-form-container">
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Enter valid email to receive confirmation</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="days">No. of Days</label>
          <input
            type="number"
            id="days"
            name="days"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Total Price</label>
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            value={price}
            readOnly
          />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Bookings;


