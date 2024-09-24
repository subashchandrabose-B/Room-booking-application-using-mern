import React, { useState, useEffect } from 'react';
import CommonHeading from "../../components/common/CommonHeading";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCheck } from 'react-icons/fa';

const Myrooms = () => {
  const [roomItems, setRoomItems] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/Home/getMyHome`, { params: { id: userId } })
        .then(result => {
          setRoomItems(result.data);
          setLoading(false);  // Data fetched successfully, stop loading
        })
        .catch(err => {
          console.log(err);
          setError('Failed to fetch rooms');// Set error message
          setLoading(false);  // Stop loading on error
        });
    }
  }, [userId]);

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Your home will"
            title="ours"
            subtitle="Becomes"
          />
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : roomItems.length > 0 ? (
            <div className="row g-4">
              {roomItems.map((item, key) => (
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={item._id}>
                  <div className="room-item shadow rounded overflow-hidden">
                    <div className="position-relative">
                      <img
                        className="img-fluid"
                        src={`http://localhost:3000/images/${item.image}`}
                        alt="Room"
                        style={{ width: '400px', height: '250px' }}
                      />
                      <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                        {`Night/ ${item.price}-INR`}
                      </small>
                    </div>
                    <div className="p-4 mt-2">
                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0">{item.name}</h5>
                      </div>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'green', fontWeight: 'bold' }}>
                        <FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />
                        {item.approval ? (
                          <span style={{color:"black"}}>Your address status: <span style={{color:"green"}}>ACCEPTED</span></span>
                        ) : (
                          <span style={{color:"black"}}>Your address status: <span style={{color:"red"}}>PENDING</span></span>
                        )}
                      </p>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'green', fontWeight: 'bold' }}>
                        <FaCheck style={{ color: 'red', fontSize: '24px' }} />
                        {item.approval ? (
                          <span style={{color:"black"}}>Your descriptions status: <span style={{color:"green"}}>ACCEPTED</span></span>
                        ) : (
                          <span style={{color:"black"}}>Your descriptions status: <span style={{color:"red"}}>PENDING</span></span>
                        )}
                      </p>
                      <div className="d-flex justify-content-between">
                        <Link to={`/EditDetails/${item._id}`} className="btn btn-sm btn-dark rounded py-2 px-4">
                          Edit
                        </Link>
                        <Link to={`/Delete/${item._id}`} className="btn btn-sm btn-dark rounded py-2 px-4">
                          Remove
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">You don't have any registered rooms.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Myrooms;

