import React, { useState, useEffect } from 'react';
import '../../css/Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registerhome() {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    apartmentNo: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [description, setDescription] = useState({
    rooms: '',
    BedRoom: '',
    Wifi: '',
    Parking: '',
    Laundry: ''
  });
  const Nav = useNavigate();
  const [userData, setUserData] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setDescription(prevDescription => ({
      ...prevDescription,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hiiiiii")
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', JSON.stringify(description));
    formData.append('file', image);
    formData.append('address', JSON.stringify(address));
    formData.append('uniqueId', userData._id);

    axios.post('http://localhost:3000/Home/addHome', formData, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    })
      .then(result => {
        Nav('/Myrooms');
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Register Your House</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="mb-4">
          <label className="form-label">House Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Price/Night:</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <div className="mb-3">
                  <label className="form-label">Number of Rooms:</label>
                  <input
                    type="text"
                    name="rooms"
                    className="form-control"
                    value={description.rooms}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Bedrooms:</label>
                  <input
                    type="text"
                    name="BedRoom"
                    className="form-control"
                    value={description.BedRoom}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Wifi Availability:</label>
                  <select
                    name="Wifi"
                    className="form-select"
                    value={description.Wifi}
                    onChange={handleDescriptionChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Laundry Availability:</label>
                  <select
                    name="Laundry"
                    className="form-select"
                    value={description.Laundry}
                    onChange={handleDescriptionChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Parking Availability:</label>
                  <select
                    name="Parking"
                    className="form-select"
                    value={description.Parking}
                    onChange={handleDescriptionChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Address</h5>
                <div className="mb-3">
                  <label className="form-label">Apartment No:</label>
                  <input
                    type="text"
                    name="apartmentNo"
                    className="form-control"
                    value={address.apartmentNo}
                    onChange={handleAddressChange}
                    placeholder="Apartment No"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Street:</label>
                  <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="Street"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City:</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">State:</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={address.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Zip Code:</label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control"
                    value={address.zipCode}
                    onChange={handleAddressChange}
                    placeholder="Zip Code"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center mb-4'>
      <div>
        <button className='btn btn-primary' type="submit">Register</button>
      </div>
      </div>
      </form>
    </div>
  );
}

export default Registerhome;

