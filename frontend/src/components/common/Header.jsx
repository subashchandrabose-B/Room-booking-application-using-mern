import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { navList } from "../data/Data";
import SocialIcons from "./SocialIcons";
import '../../css/Auth.css';
import { useContext } from 'react';
import { UserContext } from '../../pages/commonPages/Context';
export default function Header() {
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser){
      setUserData(storedUser);
    }
  }, []);
  
  return (
    <>
      <div className="container-fluid bg-dark px-0">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              to="/"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 text-primary text-uppercase">Heavenly</h1>
            </Link>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <Link to="/" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">Heavenly</h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                onClick={() => setNavbarCollapse(!navbarCollapse)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={
                  navbarCollapse
                    ? "navbar-collapse justify-content-around navbarCollapse"
                    : "collapse navbar-collapse justify-content-around"
                }
              >
                <div className="navbar-nav mr-auto py-0">
                <Link to='/' className="nav-item nav-link">Home</Link>
                <Link to='/about' className="nav-item nav-link">About</Link>
                <Link to='/contact' className="nav-item nav-link">Contact</Link>
                { !userData && (
                    <Link to='/signup' className="nav-item nav-link">Sign Up</Link>
                  )}
                {userData && userData.role=== "Room booking" && (
                  <>
                  <Link to='/booking' className="nav-item nav-link">My-bookings</Link>,
                  <Link to='/rooms' className="nav-item nav-link">Rooms</Link>
                  </>
                )}
                {userData && userData.role==="House owner" &&(
                  <> 
                  <Link to='/registerhome' className="nav-item nav-link">Register house</Link>,
                  <Link to='/Myrooms' className="nav-item nav-link">My house</Link>
                  </>
                )}
                </div>
                <SocialIcons />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
