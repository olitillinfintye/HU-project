import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/login.css";

import astu_logo from "../assets/badges/AstuFeed_badge.png";
import login_graphics from "../assets/login-graphic.png";
import { BiShowAlt, BiHide, BiCheckCircle } from "react-icons/bi";
import ip from '../helpers/Config.js';

function Reset() {


    // Get Current User

    const [userType, setUserType] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                if (res.data.user.user.hasOwnProperty('studentId')) {
                    setUserType('Student');
                    setUserEmail(res.data.user.user.email);
                } else {
                    setUserType('Staff');
                    setUserEmail(res.data.user.user.email);
                }
            }
        })
        .catch(err => {
            console.log(err);
            navigate("/");
        });
    }, []);



    // Show and Hide Password

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    // Change Password

    const [error, setError] = useState("");
    const [sent, setSent]=useState(false);

    const [formData, setFormData] = useState({
        // email: userEmail,
        // userType: userType,
        oldPassword: "",
        newPassword: "",
    });
    
    const handleChangePassword = async (event) => {
        event.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                email: userEmail,
                userType: userType,
            };

            const response = await ip.post("/api/student/changePassword", updatedFormData);
            setSent(true);
            setTimeout(() => {
                navigate("/profile");
            }, 2000); // (2 seconds)
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.message);
                console.log(formData);
            } else {
                console.log(error);
            } 
        }
    };

    const handlePasswordChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });

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
                        <p className='login-graphics-text'>Welcome to astu Interactive Feed</p>
                    </div>
                </div>
                
                    
                {/* The Form */}
            
                <form className="login-form" onSubmit={handleChangePassword}>

                {!sent ? (
                <>
                    <p class="form-title">Reset Password</p>
                    {/* <p class="signup-link">No account? <a href="/register"> Create an Account</a></p> */}

                    <div class="input-container">
                        <input placeholder="Old Password" type={passwordVisible ? 'text' : 'password'} name="oldPassword" id="oldPassword" onChange={handlePasswordChange} required/>
                        <span onClick={handlePasswordVisibility}>
                            {passwordVisible ? (
                                <BiHide className='svg'/>
                            ) : (
                                <BiShowAlt className='svg'/>
                            )}
                        </span>
                    </div>

                    <div class="input-container">
                        <input placeholder="New Password" type={passwordVisible ? 'text' : 'password'} name="newPassword" id="newPassword" onChange={handlePasswordChange} required/>
                        <span onClick={handlePasswordVisibility}>
                            {passwordVisible ? (
                                <BiHide className='svg'/>
                            ) : (
                                <BiShowAlt className='svg'/>
                            )}
                        </span>
                    </div>

                    <button class="submit reset-btn" type="submit">Reset</button>

                    <div className="error-log">{error}</div>
                </>

                ) : (
                    <div className="reset-form changed">
                        <div className='sent'>
                            <BiCheckCircle className="icon"/>
                            <p>Password Successfully Changed</p>
                        </div>
                    </div>
                )}

                </form>

            </div>

            <div className='closing-tag'>
                Copyright Ⓒ 2023 astuFeed by astu Design inc. All rights reserved
            </div>

        </div>
    );
}

export default Reset;