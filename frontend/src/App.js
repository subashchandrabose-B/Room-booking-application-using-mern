import React from "react";
import "./css/style.css";
import "./css/bootstrap.min.css";
//import "./css/animate.css";
//import "./css/animate.min.css";
import "./App.css";
import { UserProvider } from './pages/commonPages/Context';
import Header from "./components/common/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  Home,
  Booking,
  AboutUs,
  PageNotFound,
  Room,
  Services,
  Team,
  Testimonial,
} from "./pages/index";
import Contact from "./pages/commonPages/ContactPage"
import SignUp from './pages/commonPages/SignUp'
import Footer from "./components/common/Footer";
import Registerhome from "./pages/Room Registering/Registerhome";
import Bookings from "./pages/Room booking/Bookings";
import Confirmation from "./pages/Room booking/Confirmation";
import Myrooms from "./pages/Room Registering/Myrooms";
import Editdetails from "./pages/Room Registering/Editdetails";
import Updates from "./pages/Room Registering/Updates";
import ConfirmDeletion from "./pages/Room Registering/Deleteconfirmation";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { useNavList} from 'components/data/Data.jsx';
export default function App() {
  return (
    <>
      <div>
      <UserProvider>
        <Router>
          <Header
          />
          <ToastContainer/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/team" element={<Team />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/rooms" element={<Room 
            />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signup" element={<SignUp
            />}/>
            <Route path='/registerhome' element={<Registerhome/>}/>
            <Route path='/Myrooms' element={<Myrooms/>}/>
            <Route path='Bookings/:id' element={<Bookings
            />}/>
            <Route path='EditDetails/:id' element={<Editdetails
            />}/>
            <Route path='/Confirm' element={< Confirmation />}/>
            <Route path='/Delete/:id' element={<  ConfirmDeletion/>}/>
            <Route path='/updatedsuccessfully' element={< Updates />}/>
          </Routes>
          <Footer />
        </Router>
        </UserProvider>
      </div>
    </>
  );
}
