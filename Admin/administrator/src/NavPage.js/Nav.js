import React from 'react'
import './Nav.css'
import { Link, useNavigate } from 'react-router-dom'
const Nav = () => {
  const Nav=useNavigate();
  const allowToQueries=()=>{
    const storedUser = JSON.parse(localStorage.getItem('Admin'));
    if(storedUser==="ACCESS-GRANTED"){
      Nav("/queries");
    }
  }
  return (
    <div className='NavMain'>
        <div className='subNav'>
            <div className='NavEle'>
                <Link to='/employees-Maintainance'>FeedBacks</Link>
            </div>
            <div className='NavEle' onClick={allowToQueries}>
            <Link>Queries</Link>
            </div>
            <div className='NavEle'>
            <Link to='/requestsList'>Requests</Link>
            </div>
            <div className='NavEle'>
            <Link to='employees-Maintainance'>Clean</Link>
            </div>
        </div>
    </div>
  )
}

export default Nav