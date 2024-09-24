APPLICATION FOR ROOM BOOKING;

This is a room booking application built with the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to search for available rooms, view room details, and make bookings. Admin users can manage room listings, view bookings, and manage users. The application is designed to simplify the room booking process for both customers and administrators.The project demonstrates full-stack development, including RESTful API design, front-end user interaction, and database integration.

Home Page:

![Screenshot 2024-09-24 165941](https://github.com/user-attachments/assets/8bafb799-5552-4f8e-86f9-04a5659aaf81)
Main Header ("Discover A Brand Luxurious Hotel"): This is likely the welcome section for users who are looking to register their property or rooms for others to book. The prominent tagline suggests that the platform is focused on luxury hotel room bookings.

Navigation Bar: At the top of the page, the navigation menu includes several options:

Home: Takes users back to this homepage.
About: Provides information about the platform and its services.
Contact: Offers contact details for support or inquiries.
Register House: This is the key option for the room register or property owner. By clicking on this, property owners can start the process of registering their rooms or houses on the platform.
My House: This could serve as a dashboard for registered users to manage their properties, see current bookings, update room details, or modify pricing.

ROOM REGITERING FORM:
![Screenshot 2024-09-24 170128](https://github.com/user-attachments/assets/7ba9583c-5b42-417d-a48b-248690d33883)
Functionality of this Page:
This page is designed to allow property owners to input comprehensive details about their house or property in order to register it for booking. It's a straightforward and user-friendly form that gathers essential data like:

The name of the property.
Price per night for renters.
Number of rooms and bedrooms.
Address and image upload to help customers view and locate the property easily.

EDIT DETAILS OF ROOM:
![Screenshot 2024-09-24 170210](https://github.com/user-attachments/assets/8800b7ca-6027-475f-8dee-6760f4388f4b)

Page Functionality:
The "My Rooms" page serves as a property management interface where room or property owners can:

View the status of their listed rooms.
Edit or remove rooms as needed.
See essential details about each room (price, status, and description).
Ensure that the property is active and properly represented with an image and correct details.

CONTACT PAGE:
![Screenshot 2024-09-24 170054](https://github.com/user-attachments/assets/7ee97f56-f40f-45fa-bd3f-5a59130522c9)

The Contact Us page offers a simple yet effective way for users to reach out for help with various inquiries, whether related to bookings, technical problems, or general concerns. The form streamlines communication, while the dedicated contact emails provide a direct way to get in touch based on the nature of the issue.

LOGIN PAGE:

![Screenshot 2024-09-24 170351](https://github.com/user-attachments/assets/20ec6355-a705-458f-b62e-6eebd151156b)
The Sign-Up Page is an essential component of the Heavenly Room Booking website, allowing new users to create an account and define their role on the platform. Users are prompted to provide the following details:

Name: The user's full name.
Username: A unique username for the user.
Email: The user's email address, used for account verification and notifications.
Password: A secure password for logging in.
Purpose: A dropdown selection for specifying the user's role:
Room Booking: For users looking to book rooms.
House Owner: For users who want to register and list their homes for others to book.

USER PROFILE:

![Screenshot 2024-09-24 170239](https://github.com/user-attachments/assets/6874d301-6602-4513-a127-da4e8589c645)


User Profile Icon
Location: The User Profile Icon is located in the top-right corner of the navigation bar.
Icon Design: The icon is represented by a user silhouette, displayed using FontAwesomeIcon (faUserCircle).
Functionality:
Profile Access: Clicking on the icon opens a dropdown menu where users can view and edit their profile, log out, or access other user-specific settings.
Popup Menu: A pop-up menu appears when the icon is clicked, and it disappears when the user clicks anywhere else on the screen.
Responsive Design: The icon adjusts to different screen sizes and remains accessible on both desktop and mobile views.

NOTIFICATION ICON:

![Screenshot 2024-09-24 170253](https://github.com/user-attachments/assets/fda26168-476a-4bd0-b2e7-d2ecef77e0ff)

Icon Design: It is represented by a bell icon, commonly used for notifications, implemented using FontAwesomeIcon (faBell).
Functionality:
Query Notifications: Users receive notifications when an admin responds to their queries or inquiries.
Unread Notification Badge: A red badge with a count appears on the notification icon whenever there are unread messages or responses from the admin.
Dropdown Notification List: When clicked, the icon opens a dropdown showing a list of recent notifications, including:
Admin responses to user queries.
Updates on user bookings or other important platform messages.
Mark as Read: Users can mark notifications as read by interacting with them directly in the dropdown.

ROOM BOOKING WITH DATE FILTER:

![Screenshot 2024-09-24 170524](https://github.com/user-attachments/assets/6ae53f81-dc10-4d17-85ec-1d8a19215d4b)

Date Selection:
A date picker allows users to select the check-in date. Only rooms available for the selected date are shown.
If no rooms are available for a specific date, the page will display a message: "No rooms available. Try a different date."
Room Display Section:
Once a date is selected and rooms are available, this section will showcase the rooms with details such as price, description, and images.
Responsive Design:
The layout is fully responsive and adjusts smoothly to different screen sizes.
Header Navigation:
The top navigation bar includes links to:
Home, About, Contact, My-Bookings, and Rooms.
Social Media Icons: Facebook, Twitter, Instagram, LinkedIn, and YouTube.
User Profile Icon: Allows users to access their profile settings.
Notification Icon: Displays user notifications related to queries or responses from the admin.

Admin control:

![Screenshot 2024-09-24 233749](https://github.com/user-attachments/assets/a7c0877b-c370-47dd-ae27-190e2d7148b2)

Secret Key Access: The app employs a secret key mechanism to control access to the dashboard. Only users with the correct key can unlock its features.

Feedback Management: A dedicated section to collect and manage user feedback. Useful for tracking issues, suggestions, or improvements.

Query Management: The app allows users to submit queries, which can be organized, tracked, and responded to in a systematic manner.

Request Handling: There is a section specifically for handling various user requests, whether they are technical, administrative, or service-related.

Data Cleaning: An admin feature that allows for the clearing of entries (feedback, queries, or requests), giving more control over managing the database.

Responsive UI: The interface is designed to work seamlessly across multiple devices, whether on desktop or mobile.

MONGODB TO STORE DATA:
MongoDB Collections
logincredentials

Stores user login information.
May include fields like username, password, role, and authentication-related details.
housedatas

Stores information about available rooms and houses.
Each entry contains:
name: The name of the room or house.
price: The cost of renting the room/house.
description: Details about the room/house, including an image URL.
address: A nested object that contains apartmentNo, street, city, state, and zipCode.
bookedDates: An array to track booking details and approval status.
Other Collections:

bookingdetails: Manages the details of user bookings.
notifications: Tracks system or user notifications.
queries: Stores user-submitted queries.
todos: Handles task management or to-do lists.




COMMANDS TO CLONE IT AND RUN IN YOUR LOCAL HOST:

STEP 1 Clone the repository:
git clone https://github.com/your-username/your-repo.git

STEP 2 Navigate into the project directory:
cd your-repo

STEP 3 Install project dependencies:
npm install

STEP 4 Start the server:

npm start

