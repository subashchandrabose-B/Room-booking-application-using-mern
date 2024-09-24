import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomeRequest.css'; // Assuming you have a separate CSS file for custom styles

const HomeRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get("http://localhost:3000/Admin-access/requests");

        if (result && result.data) {
          setRequests(result.data);
        } else {
          console.log("Failed to load requests");
        }
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };

    fetchItems();
  }, []);

  const giveApproval = async (id) => {
    try {
      const result = await axios.put(`http://localhost:3000/Admin-access/giveApproval/${id}`);
      
      if (result.data === "success") {
        console.log("Approval successful");
        // Optionally, you can remove the approved request from the list or update its status
        setRequests(requests.filter(request => request._id !== id));
      } else {
        console.log("Approval failed");
      }
    } catch (error) {
      console.log("Error during approval:", error);
    }
  };
  const rejectApproval = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:3000/Admin-access/rejectApproval/${id}`);
      
      if (result.data === "success") {
        console.log("rejected successful");
        // Optionally, you can remove the approved request from the list or update its status
        setRequests(requests.filter(request => request._id !== id));
      } else {
        console.log("rejection failed");
      }
    } catch (error) {
      console.log("Error during rejection:", error);
    }
  };

  return (
    <div className='main'>
      <div className="home-request-container">
        {requests.length === 0 ? (
          <p style={{color:"white",fontSize:"30px"}}>No requests available.</p>
        ) : (
          requests.map((request, index) => (
            <div key={index} className="request-card">
              <div className="request-info">
                <label className="label">House Name:</label>
                <p>{request.name}</p>
              </div>

              <div className="request-info">
                <label className="label">Price/Night:</label>
                <p>{request.price}</p>
              </div>
              <div>
                <img
                  src={`http://localhost:3000/images/${request.image}`}
                  alt="img"
                  style={{ width: "30%", height: "auto" }}
                />
              </div>
              <div className="request-details">
                <div className="description">
                  <h5>Description</h5>
                  <div className="description-item">
                    <label className="label">Number of Rooms:</label>
                    <p>{request.description.rooms}</p>
                  </div>
                  <div className="description-item">
                    <label className="label">Number of Bedrooms:</label>
                    <p>{request.description.BedRoom}</p>
                  </div>
                  <div className="description-item">
                    <label className="label">Wifi Availability:</label>
                    <p>{request.description.Wifi}</p>
                  </div>
                  <div className="description-item">
                    <label className="label">Laundry Availability:</label>
                    <p>{request.description.Laundry}</p>
                  </div>
                  <div className="description-item">
                    <label className="label">Parking Availability:</label>
                    <p>{request.description.Parking}</p>
                  </div>
                </div>

                <div className="address">
                  <h5>Address</h5>
                  <div className="address-item">
                    <label className="label">Apartment No:</label>
                    <p>{request.address.apartmentNo}</p>
                  </div>
                  <div className="address-item">
                    <label className="label">Street:</label>
                    <p>{request.address.street}</p>
                  </div>
                  <div className="address-item">
                    <label className="label">City:</label>
                    <p>{request.address.city}</p>
                  </div>
                  <div className="address-item">
                    <label className="label">State:</label>
                    <p>{request.address.state}</p>
                  </div>
                  <div className="address-item">
                    <label className="label">Zip Code:</label>
                    <p>{request.address.zipCode}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => giveApproval(request._id)} 
                className='approve-button'
              >
                Approve
              </button>
              <button style={{paddingRight:"10px",backgroundcolor:"red"}}
                onClick={() => rejectApproval(request._id)} 
                className='approve-button'
              >
                Reject
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeRequest;





