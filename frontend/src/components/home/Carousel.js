import React, { useEffect, useState } from "react";

export default function SimpleCarousel() {
  const carouselData = [
    {
      subtitle: "Welcome",
      title: "Discover A Brand Luxurious Hotel",
      btn1: "Explore Rooms",
      btn2: "Sign Up",
      img: "../assets/img/carousel-1.jpg",
    },
    // Add more objects if needed for additional content.
  ];
  const [userData,setUserData]=useState("");
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser){
      setUserData(storedUser);
    }
  },[])
  return (
    <div className="container-fluid p-0 mb-5">
      <div className="carousel-static">
        {carouselData.map((val, index) => (
          <div className="position-relative text-center" key={index}>
            <img className="w-100" src={val.img} alt="background-Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "700px" }}>
                <h6 className=" section-title text-white text-uppercase mb-3">
                  {val.subtitle}
                </h6>
                <h1 className="display-3 text-white mb-4">
                  {val.title}
                </h1>
                <a href="/rooms" className="btn btn-primary py-md-3 px-md-5 me-3">
                  {val.btn1}
                </a>
                {!userData &&  <a href="/signup" className="btn btn-light py-md-3 px-md-5">
                  {val.btn2}
                </a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
