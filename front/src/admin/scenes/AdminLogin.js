import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import astu_logo from '../../assets/badges/hu_badge.png';
import login_graphics from '../../assets/login-graphic.png';
import { BiShowAlt, BiHide } from 'react-icons/bi';
import axios from 'axios';
import ip from "../../helpers/Config.js";

function Login() {
  const [loginData, setLoginData] = useState({
    loginAs: 'admin',
    email: '',
    password: '',
  });

  const [senderType, setSenderType] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // define navigation
  const [error, setError] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/api/user')
      .then((res) => {
        if (res.data.status === 'Success') {
          if (res.data.user.user.hasOwnProperty('adminId')) {
            setSenderType('Admin');
          }
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && senderType === 'Admin') {
      navigate('/admin');
    }
  }, [loading, senderType, navigate]);

  axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', loginData, { withCredentials: true });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        if (response.data.user.hasOwnProperty('adminId')) {
          navigate('/admin');
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleInputChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="insign">
      <Link to="/">
        <img src={astu_logo} className="astu-logo" alt="astu-logo" />
      </Link>

      <div className="insign-body">
        {/* The Graphics */}
        <div className="login-graphics-overlay">
          <img src={login_graphics} className="login-graphics" alt="login-graphics" />
          <div className="login-graphics-word">
            <p className="login-graphics-title">Create. Communicate. Learn</p>
            <p className="login-graphics-text">Welcome to HU Interactive Feed</p>
          </div>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <p className="form-title">Log in</p>
          <div className="input-container">
            <input placeholder="Email" type="email" name="email" id="email" onChange={handleInputChange} required />
          </div>
          <div className="input-container">
            <input
              placeholder="Password"
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              id="password"
              onChange={handleInputChange}
              required
            />
            <span onClick={handlePasswordVisibility}>
              {passwordVisible ? <BiHide className="svg" /> : <BiShowAlt className="svg" />}
            </span>
          </div>
          <button className="submit" type="submit">
            Log in
          </button>
          <div className="error">{error}</div>
        </form>
      </div>

      <div className="closing-tag">Copyright Ⓒ 2024 Harambee University by Nahi. All rights reserved</div>
    </div>
  );
}

export default Login;
