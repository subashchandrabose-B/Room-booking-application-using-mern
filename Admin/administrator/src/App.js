import './App.css';
import Login from './AdminLoginPage/Login';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './AdminAccessPage.js/AdminHome';
import Nav from './NavPage.js/Nav';
import HomeRequest from './RequestHandle.js/HomeRequest';
import Queries from './Queries/Queries';
import Reply from './Queries/Reply';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="AdminHome" element={<AdminHome />}/>
        <Route path='/requestsList' element={<HomeRequest/>}/>
        <Route path="/queries" element={<Queries/>}/>
        <Route path='/replyPage/:id' element={<Reply/>}/>
      </Routes>
    </div>
  );
}

export default App;

