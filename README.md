# CartRabbit

# Guest Room Booking Application

Guest Room Booking Application Designed For House Owners Who Offer Short-Term Accommodations And For Customers Looking To Book Rooms. The Application Provides An Efficient Way For House Owners To Manage Their Rooms And Bookings While Offering Customers A Seamless Browsing And Booking Experience. Additionally, The Application Sends Email Notifications When a Room Is Booked.



![image](https://github.com/user-attachments/assets/9f1d47c4-906c-4dae-bde6-857a5e6be97c)


## Mobile and Desktop Views :

Guest Room Website Is Designed To Be Fully Responsive, Providing An Optimal Experience Across Both Mobile And Desktop Devices. You can view the application in action through the following videos:

- **[Desktop View Video](https://drive.google.com/file/d/1Q3k4tGCdnWxqz6kz1uJPEr7DwKK1IXFT/view?usp=sharing)**
- **[Mobile View Video](https://drive.google.com/file/d/1dn1Hwl-0zycAEmzA8dWin9zpKYLkz7ez/view?usp=sharing)**

These videos demonstrate the application’s user interface and functionality on different devices.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Email Notifications](#email-notifications)

## Overview

Guest allows house owners to manage room listings and bookings, and customers to browse and book rooms. Key features include:

- **House Owners:**
  - Register and manage accounts.
  - Create, edit, and delete room listings.
  - Set booking parameters (minimum/maximum duration, daily rent).
  - Upload room photos.

- **Customers:**
  - Register and manage accounts.
  - Browse available rooms.
  - View room details, including photos and availability.
  - Book rooms for specified dates.
  - Receive email notifications upon booking.

## Features

### House Owners
- Register and manage accounts.
- Create, edit, and delete room listings.
- Set booking duration limits.
- Specify daily rent.
- Upload room photos.

### Customers
- Register and manage accounts.
- Browse and filter available rooms.
- View room details and photos.
- Check room availability.
- Book rooms for desired dates.
- Receive email notifications upon successful booking.

## Technologies

- **Frontend:**
  - React
  - Bootstrap
  - JavaScript

![image](https://github.com/user-attachments/assets/9d0022ce-45b9-4c60-b979-5c1728c1a411)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
 
![image](https://github.com/user-attachments/assets/deea4c78-fcee-44d3-adc3-0e8693409eba)


- **Email Notifications:**
  - EmailJS

![download (5)](https://github.com/user-attachments/assets/de9ee05a-8d6f-4815-901d-be79a7b665c1)


- **Authentication:** JWT (JSON Web Tokens)

## Installation

To set up the application locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/gust-room-booking-application.git
    ```
2. **Navigate into the project directory:**
    ```bash
    cd gust-room-booking-application
    ```

3. **Set up the backend:**
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file for environment variables:
      ```
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      EMAILJS_USER_ID=your_emailjs_user_id
      EMAILJS_SERVICE_ID=your_emailjs_service_id
      EMAILJS_TEMPLATE_ID=your_emailjs_template_id
      ```
    - Start the backend server:
      ```bash
      npm start
      ```

4. **Set up the frontend:**
    - Navigate to the frontend directory:
      ```bash
      cd ../frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Configure EmailJS in the frontend:
      - Create a file (e.g., `src/emailService.js`) to configure and export the EmailJS setup:
        ```javascript
        const templateParams = {
          name: name,
          email: email,
          days: days,
          price: price
        };

        emailjs.send(
          'service_mzm96fm', 
          'template_4j00qli', 
          templateParams, 
          'EpeB5yDPAKKpw8v7o'
        )
          .then((response) => {
            console.log('Email successfully sent!', response.status, response.text);
          })
          .catch((err) => {
            console.error('Failed to send email. Error: ', err);
          });
     ```
     
5. **Access the application:**
    - Open your browser and go to `http://localhost:3000` for the frontend.
    - The backend will be running on `http://localhost:3002` by default.

## Email Notifications

When a customer books a room, the application sends an email notification to both the customer and the house owner using EmailJS. To set this up:

1. **EmailJS Configuration:**
   - Sign up at [EmailJS](https://www.emailjs.com/) and create a new email service and template.
   - Obtain your `user_id`, `service_id`, and `template_id` from the EmailJS dashboard.
  
   Customer Email
  ![image](https://github.com/user-attachments/assets/c152c1c8-c7f6-4e03-8da1-158293fc394d)

![image](https://github.com/user-attachments/assets/8512879f-92c3-4f47-9d86-93ac770a00d9)


3. **Integrate EmailJS:**
   - Configure the EmailJS setup in your frontend as outlined in the [Installation](#installation) section.
   - Use the `sendBookingEmail` function from `emailService.js` to send booking notifications upon successful room booking.

## MongoDB Integration

To use MongoDB for storing data, including user information, room details, and booking records, follow these steps:

1. **Set Up MongoDB:**
   - Sign up for a MongoDB Atlas account or set up a local MongoDB instance.
   - Create a new database for the application.
  
     ```javascript
     const handleLogin=(e)=>{
     e.preventDefault()
     axios.post('http://localhost:3000/login',{loginemail,loginpassword})
     .then(result=>{
      setShowSignUp(true);
      Nav('/')
     })
     .catch(err=>{
      console.log(err);
     })
     }
     const handleSignin=(e)=>{
     e.preventDefault();
     axios.post('http://localhost:3000/register',{
      signname,signusername,signuseremail,signuserPassword
     })
     .then(result=>{
      setActiveTab('login')
     })
     .catch(err=>{
      console.log('error')
     })
     }
  ![image](https://github.com/user-attachments/assets/e2cbe1c3-25c3-4bb9-a5bb-2076e5b72242)

2. **Create Collections:**
   - `users` for authentication and user management.
   - `rooms` for storing room listings.
   - `bookings` for tracking customer bookings.
```javascript
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., sending the data to a server
    const formData=new FormData();
    formData.append('name',name)
    formData.append('price',price)
    formData.append('description',description)
    formData.append('file',image)
    axios.post('http://localhost:3001/registerhome',formData,{
      headers:{
        "Content-Type":'multipart/form-data'
      }
    })
    .then(result=>{
      console.log("ok")
      Nav('/rooms')
    })
    .catch(err=>{
      console.error(err);
    })
  };
```
![image](https://github.com/user-attachments/assets/2e91feac-2cba-49de-b1bd-11a950ebc79d)

3. **Backend Configuration:**
   - Install Mongoose:

     ```bash
     npm install mongoose
     ```

   - Configure MongoDB connection in your `backend/index.js`:

     ```javascript
     const mongoose = require('mongoose');
     require('dotenv').config();

     const mongoURI = process.env.MONGO_URI;

     mongoose.connect(mongoURI, {
       useNewUrlParser: true,
       useUnifiedTopology: true
     }).then(() => {
       console.log('MongoDB connected');
     }).catch(err => {
       console.error('MongoDB connection error:', err);
     });
     ```

   - Define Mongoose models for `User`, `Room`, and `Booking` in the `models` directory.

     
![image](https://github.com/user-attachments/assets/74c54898-bf5e-4553-87e4-0167b2d054aa)

## Deployment Instructions

To deploy and run this project, follow the instructions below for both development and production environments.

### Development of backend

For local development, you can use the following `npm` scripts:

1. **Start the Backend**: Run the backend server with:
   ```bash
   npm run dev
2. Start the Frontend: Run the frontend application with:
  ```bash
   npm run dev1
````
3. Start Additional Service (if applicable): Run any additional services with:
  ```bash
   npm run dev2
```

### Development of frontend
To deploy the application for production, you'll typically want to build the frontend and backend, then serve them. Follow these steps:

Build the Frontend: Create the production build of the frontend application. This step may vary depending on the frontend framework you are using. For example, with React, you might use:
```bash
npm run build
```
Start the Backend: Ensure the backend server is running. For production, you might use a command like:
``bash
npm start
``

## File Structure 

![image](https://github.com/user-attachments/assets/b26186ba-4745-4477-a99e-5436143387df)


## Conclusion

Following the instructions above, you should be able to set up both the development and production environments for this project. 

- **For Development**: Use the provided `npm` scripts to start the backend, frontend, and any additional services locally.
- **For Production**: Build the frontend, start the backend server, and deploy the built frontend to your chosen hosting solution.

Make sure to configure any necessary environment variables and ensure your deployment environment is set up to handle production workloads. For specific deployment details, refer to your hosting platform's documentation.

If you encounter any issues or have questions, feel free to open an issue in this repository or consult the project's documentation and community resources.

Thank you for using this project!


