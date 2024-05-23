import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import "../styles/login.css";
import astu_logo from "../assets/badges/hu_badge.png";
import login_graphics from "../assets/login-graphic.png";
import { BiShowAlt, BiHide } from "react-icons/bi";

import axios from "axios";

function Login() {

    // POST LOGIN

    const [loginData, setLoginData] = useState({
        loginAs: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();             // define navigation
    const [error, setError] = useState('');     // define error

    axios.defaults.withCredentials = true;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/login',
                loginData,
                { withCredentials: true }
            );
            if (response.data.error) {
                alert(response.data.error);
            } else {
                navigate("/");
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


    // Show and Hide Password

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    return (
        <div className="insign">

            <Link to="/" >
                <img src={astu_logo} className='astu-logo' alt="astu-logo"/>
            </Link>

            <div className='insign-body'>
    {/* The Graphics */}
    <div className='login-graphics-overlay'>
        <img src={login_graphics} className='login-graphics' alt="login-graphics"/>
        <div className='login-graphics-word'>
            <p className='login-graphics-title'>Create. Communicate. Learn</p>
            <p className='login-graphics-text'>Welcome to HU Interactive Feed</p>
        </div>
    </div>

    {/* The Form */}
    <form onSubmit={handleSubmit} className="login-form">
        <p className="form-title">Log in</p>
        <p className="signup-link">No account? <a href="/register">Create an Account</a></p>

        <div className="input-container">
            <input placeholder="Email" type="email" name="email" id="email" onChange={handleInputChange} required/>
        </div>

        <div className="input-container">
            <input placeholder="Password" type={passwordVisible ? 'text' : 'password'} name="password" id="password" onChange={handleInputChange} required/>
            <span onClick={handlePasswordVisibility}>
                {passwordVisible ? <BiHide className='svg'/> : <BiShowAlt className='svg'/>}
            </span>
        </div>

        <div className="login__choice">    
            <select id="loginAs" name="loginAs" onChange={handleInputChange} required>
                <option value="" disabled selected>Login As</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
            </select>
            <p className="signup-link forgot"><a href="/forgot">Forgot Password</a></p>
        </div>

        <button className="submit" type="submit">Log in</button>
        {/* <p className="signup-link">No account? <a href="/register">Create an Account</a></p> */}
        <div className="error-log">{error}</div>
    </form>
</div>

            <div className='closing-tag'>
                Copyright Ⓒ 2024 Harambee University by Nahi. All rights reserved
            </div>

        </div>
    );
}

export default Login;