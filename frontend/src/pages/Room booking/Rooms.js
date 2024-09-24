import React, { useEffect, useState, useContext } from "react";
import CommonHeading from "../../components/common/CommonHeading";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from '../commonPages/Context';

export default function Rooms() {
  const [roomItems, setRoomItems] = useState([]);
  const { selectedDate, setSelectedDate } = useContext(UserContext);

  useEffect(() => {
     if(selectedDate){
      axios.get("http://localhost:3000/Home/getHomes",{params: { selectedDate }})
      .then((response)=>{
        console.log(response.data);
        setRoomItems(response.data);
      })
      .catch((err) => {
        console.error("Error fetching room data:", err);
      });
    }
  }, [selectedDate]);

  const handleDateChange = (e) => {
    e.preventDefault();
    setSelectedDate(e.target.value);
  };
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row mb-4 justify-content-center">
            <div className="col-md-4">
              <label htmlFor="dateInput" className="form-label">
                Select Date:
              </label>
              <input
                type="date"
                id="dateInput"
                className="form-control"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          {/* Conditional rendering based on selectedDate */}
          {selectedDate ? (
            <>
              <CommonHeading
                heading="Our Rooms"
                title="Rooms"
                subtitle="Explore Our"
              />
              {roomItems.length > 0 ? (
                <div className="row g-4">
                  {roomItems.map((item) => (
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
                          <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                            {`Night/ ${item.price}-INR`}
                          </small>
                        </div>
                        <div className="p-4 mt-2">
                          <div className="d-flex justify-content-between mb-3">
                            <h5 className="mb-0">{item.name}</h5>
                          </div>
                          <div className="d-flex justify-content-between">
                            <Link
                              to={`/room-details/${item._id}`}
                              className="btn btn-sm btn-primary rounded py-2 px-4"
                            >
                              View details
                            </Link>
                            <Link
                              to={`/Bookings/${item._id}?date=${selectedDate}`}
                              className="btn btn-sm btn-dark rounded py-2 px-4"
                            >
                              Book room
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-5">
                  <h2 className="display-6" style={{ fontSize: '2rem' }}>
                    No rooms available. Try a different date.
                  </h2>
                </div>
              )}
            </>
          ) : (
            <div className="text-center mt-5">
              <h2 className="display-6" style={{ fontSize: '2rem' }}>
                Select a date to find rooms.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
