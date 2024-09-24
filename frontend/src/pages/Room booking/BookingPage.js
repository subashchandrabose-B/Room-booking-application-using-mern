import React, { useState,useEffect } from "react";
import Heading from "../../components/common/Heading";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Booking() {
  const userAuth=JSON.parse(localStorage.getItem('user'))._id;
  const [myBookings,setMyBookings]=useState([]);
  useEffect(()=>{
    if(userAuth){
      console.log(userAuth)
      axios.get(`http://localhost:3000/booking/myBooking/${userAuth}`)
      .then(result=>setMyBookings(result.data))
      .catch(err=>{
        console.log(err);
      })
    }
  },[userAuth])
  return (
    <>
    <Heading heading="Booking" title="Home" subtitle="Booking"/>
      <>
      <div className="container-xxl py-5">
        <div className="container">
          {/* Conditional rendering based on selectedDate */}
          {myBookings ? (
            <>
              <div className="row g-4">
                {myBookings.map((item, key) => (
                  <div
                    className="col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                    key={item._id}
                  >
                    <div className="room-item shadow rounded overflow-hidden">
                      <div className="position-relative">
                        <img
                          className="img-fluid"
                          src={`http://localhost:3000/images/${item.image}`}
                          alt="img"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className="p-4 mt-2">
                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-0" style={{color:"green"}}><p style={{color:"black"}}>Hey! {item.name}</p>Your Booking Successfull</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                           <p style={{color:"#444444",fontWeight:"600"}}>Check-In:<span style={{color:"#800000",fontWeight:"600"}}>{item.checkInDate}</span></p>
                           <p style={{color:"#444444",fontWeight:"600"}}>Check-Out:<span style={{color:"#800000",fontWeight:"600"}}>{item.checkOutDate}</span></p>
                        </div>
                        <div>
                          <p style={{color:"navy",fontWeight:"200"}}>For any further queries <span style={{color:"navyblue",fontWeight:"600"}}><Link to='/contact'>contact</Link></span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center mt-5">
              <h2 className="display-6" style={{ fontSize: '2rem' }}>Select a date to find rooms</h2>
            </div>
          )}
        </div>
      </div>
    </>
    </>
  );
}
