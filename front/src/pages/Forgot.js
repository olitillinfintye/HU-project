import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

import "../styles/login.css";
import ip from '../helpers/Config.js';

import astu_logo from "../assets/badges/hu_badge.png";
import login_graphics from "../assets/login-graphic.png";
import { BiCheckCircle } from "react-icons/bi";

function Forgot() {

    const [sent, setSent]=useState(false);
    const [error, setError] = useState("");


    // Forget Password

    const [formData, setFormData] = useState({
        email: "",
        userType: "",
    });

    const handleForgetPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await ip.post("/api/student/forgetPassword", formData);
            console.log(response.data);
            setSent(true);
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                console.log(error);
            } 
        }
    };

    const handleInputChange = (event) => {
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
                        <p className='login-graphics-text'>Welcome to HU Interactive Feed</p>
                    </div>
                </div>
                
                    
                {/* The Form */}
            
                <form className="login-form reset-form" onSubmit={handleForgetPassword}>
                {!sent ? (
                <>
                    <p class="form-title">Forgot Password</p>
                    <p class="signup-link memo">Enter your <b className='color'>Email</b> and <b className='color'>Role</b>, we will send you your password</p>


                    <div class="input-container reset-email">
                        <input placeholder="Email" type="email" name="email" id="email" onChange={handleInputChange} required/>
                    </div>

                    <div className="login__choice">    
                        <select id="userType" name="userType" onChange={handleInputChange} required>
                            <option hidden>Role</option>
                            <option value="Student">Student</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>

                    <button class="submit" type="submit">SEND</button>

                    <div className="error-log">{error}</div>
                </>
                ) : (
                <>


                    <div className='sent'>
                        <BiCheckCircle className="icon"/>
                        <p>Email Verification Sent</p>
                    </div>

                </>
                )}
                </form>

            </div>

            <div className='closing-tag'>
                Copyright Ⓒ 2024 Harambee University by Nahi. All rights reserved
            </div>

        </div>
    );
}

export default Forgot;