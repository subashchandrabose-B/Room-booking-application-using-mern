import React, { useState } from 'react';
import '../../css/Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from './Context';
import { toast } from 'react-toastify';
function Auth() {
  axios.defaults.withCredentials=true;
  const { setUserData } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('signup');
  const [loginemail, setLoginemail] = useState("");
  const [loginpassword, setLoginpassword] = useState("");
  const Nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/user/login', { loginemail, loginpassword })
      .then(result => {
        if(result.data=="Invalid Email"){
          toast("user email not found",{
            position: "top-right",
            autoClose: 5000,
          })
        }
        else if(result.data=="Invalid password"){
          toast("Password does not match",{
            position: "top-right",
            autoClose: 5000,
          })
        }
        else{
          Authentication(result._id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const Authentication= () =>{
     axios.get('http://localhost:3000/user/auth')
     .then(result=>{
      setUserData(result.data)
      localStorage.setItem('user', JSON.stringify(result.data));
      Nav('/')
    })
     .catch(err=>console.log(err))
  }
  const handleSignin = (data) => {
    axios.post('http://localhost:3000/user/register', {
      signname: data.name,
      signusername: data.UserName,
      signuseremail: data.email,
      signuserPassword: data.password,
      purpose: data.purpose // Include the new field in the request
    })
      .then(result => {
        if(result.data=="Email already exists"){
          toast("Email already exists",{
            position: "top-right",
            autoClose: 5000,
          })
        }
        else{
          setActiveTab('login');
        }
      })
      .catch(err => {
        console.log('error catched', err.message);
      });
  };

  return (
    <div className="auth-container  w-40">
      <div className="tabs">
        <button className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabClick('login')}>
          Login
        </button>
        <button className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => handleTabClick('signup')}>
          Signup
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'login' && (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="loginEmail">Email:</label>
              <input
                type="email"
                id="loginEmail"
                value={loginemail}
                onChange={(e) => setLoginemail(e.target.value)}
                
                name="loginEmail"
                required
              />
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                id="loginPassword"
                value={loginpassword}
                onChange={(e) => setLoginpassword(e.target.value)}
                name="loginPassword"
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
        {activeTab === 'signup' && (
          <div className="signup-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit(handleSignin)} className="form">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Minimum length is 2' },
                    validate: value => !/\s/.test(value) || 'No spaces allowed'
                  })}
                />
                {errors.name && <p className='span'>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="UserName">UserName</label>
                <input
                  id="UserName"
                  {...register('UserName', {
                    required: 'UserName is required',
                    minLength: { value: 2, message: 'Minimum length is 2' },
                    validate: value => !/\s/.test(value) || 'No spaces allowed'
                  })}
                />
                {errors.UserName && <p className='span'>{errors.UserName.message}</p>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address'}
                  })}
                />
                {errors.email && <p className='span'>{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Minimum length is 8' },
                    validate: value => {
                      const validations = [
                        { test: /[a-z]/, message: 'Must contain at least one lowercase letter'},
                        { test: /[A-Z]/, message: 'Must contain at least one uppercase letter'},
                        { test: /[0-9]/, message: 'Must contain at least one number' },
                        { test: /[!@#$%^&*]/, message: 'Must contain at least one special character' }
                      ];
                      for (const { test, message } of validations) {
                        if (!test.test(value)) return message;
                      }
                      return true;
                    }
                  })}
                />
                {errors.password && <p className='span'>{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="purpose">Purpose</label>
                <select id="purpose" {...register('purpose', { required: 'Purpose is required' })}>
                  <option value="">Select purpose</option>
                  <option value="Room booking">Room booking</option>
                  <option value="House owner">House owner</option>
                </select>
                {errors.purpose && <p className='span'>{errors.purpose.message}</p>}
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
export default Auth;



 