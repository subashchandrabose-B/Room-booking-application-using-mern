import React, { useState, useEffect, useRef } from "react";
import { socialIcons } from "../data/Data";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../../css/style.css';
import { useContext } from 'react';
import { UserContext } from '../../pages/commonPages/Context';
import axios from "axios";

export default function SocialIcons() {
  const { userData, setUserData } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState({ userInfo: false, notifications: false });
  const popupRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    fontSize: '24px',
    cursor: 'pointer',
  };

  const dotStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    height: '10px',
    width: '10px',
    backgroundColor: 'red',
    borderRadius: '50%',
    border: '2px solid white',
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUserData(storedUser);
    }

    // Close popup when clicking outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsVisible({ userInfo: false, notifications: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setUserData]);

  const fetchNotifications = async () => {
    try {
      if (userData && userData._id) {
        const response = await axios.get(`http://localhost:3000/Admin-access/getNotifications/${userData._id}`);
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const clearNotifications = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/Admin-access/clearNotifications/${userData._id}`);
      if (response.data === 'success') {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error while deleting notifications:", error);
    }
  };

  const toggleOverlay = (type) => (e) => {
    e.preventDefault();
    if (type === 'notifications' && !isVisible.notifications) {
      fetchNotifications();
    }
    setIsVisible((prevState) => ({
      ...prevState,
      [type]: !prevState[type]
    }));
  };

  const handleRemove = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setUserData(null);
  };

  return (
    <div className="col-lg-3 px-5">
      <div className="d-inline-flex align-items-center py-2">
        {socialIcons.map((val, index) => (
          <div key={index}>
            <Link className="me-3" href={val.link}>
              {val.icon}
            </Link>
          </div>
        ))}
        {userData && (
          <>
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ fontSize: '30px', color: 'white', cursor: 'pointer', paddingRight: '10px' }} // Added margin between icons
              onClick={toggleOverlay('userInfo')}
            />
            {isVisible.userInfo && (
              <div className="popup-overlay" ref={popupRef}>
                <div className="popup-content bg-white p-3 rounded shadow">
                  <h3>{userData.name}</h3>
                  <p>{userData.userEmail}</p>
                  <p>{userData.userName}</p>
                  <button className="btn btn-danger mt-2" onClick={handleRemove}>Logout</button>
                </div>
              </div>
            )}
          </>
        )}
        {userData && (
          <><div style={containerStyle}> 
            <FontAwesomeIcon
              icon={faBell}
              style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}
              onClick={toggleOverlay('notifications')}
            />
            {notifications.length > 0 && <span style={dotStyle}></span>}
            </div>
            {isVisible.notifications && (
              <div className="popup-overlay" ref={popupRef}>
                <div className="popup-content bg-white p-3 rounded shadow">
                  <h3>Notifications</h3>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notif, index) => (
                        <li key={index}>{notif.message}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No notifications</p>
                  )}
                  <button className="btn btn-danger mt-2" onClick={clearNotifications}>Clear Notifications</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}



