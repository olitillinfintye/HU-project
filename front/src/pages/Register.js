import React from "react";
import {useNavigate, Link} from 'react-router-dom';
import "../styles/Register.css";

import { useState, useEffect } from 'react';
import ip from '../helpers/Config.js';

import login_graphics from "../assets/login-graphic.png";
import astu_logo from "../assets/badges/hu_badge.png";
import { RiUploadCloud2Fill } from "react-icons/ri";

function Register() {


    // Radio Button functionality

    const [selectedOption, setSelectedOption] = useState('student');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setFile(null);
    };


    // Get Department

    const [depts, setDepts] = useState([]);

    useEffect(() => { 
        ip.get('/api/student/getDep')
        .then(response => setDepts(response.data))
        .catch(err => console.log(err));
    }, []);



    // Student Registration

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [picture, setImage] = useState(null);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        picture: picture,
        year: "",
        depId: "",
        // schoolYear: "",
        // degreeType: "UG",
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await ip.post("/api/student/register", {
                ...formData,
                picture,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFormData({});
            setImage("");

            console.log(response.data);
            navigate('/login');
        }    
        catch (error) {
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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };


    // Upload Image Preview

    const [file, setFile] = useState();

    function getFile(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    const twoFunctions = (e) => {
        getFile(e);
        handleImageChange(e);
    }




    // Staff Registration


    const [staffData, setStaffData] = useState({
        fullname: "",
        email: "",
        password: "",
        picture: picture,
    });
    
    const handleStaffSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await ip.post("/api/staff/stReg", {
                ...staffData,
                picture,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setStaffData({});
            setImage("");

            console.log(response.data);
            navigate('/login');
        }    
        catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                console.log(error);
            } 
        }
    };
    
    const handleStaffChange = (event) => {
        setStaffData({ ...staffData, [event.target.name]: event.target.value });
    };






    return (
        <div className="reg-main">

            <Link to="/" >
                <img src={astu_logo} className='astu-logo' alt="astu-logo"/>
            </Link>

            <div className='register-graphics-overlay'>
                <img src={login_graphics} className='register-graphics' alt="login-graphics"/>
                <div className='register-graphics-word'>
                    <p className='register-graphics-title'>Create. Communicate. Learn</p>
                    <p className='register-graphics-text'>Welcome to HU Interactive Feed</p>
                </div>
            </div>

            <div className="reg-container">

                <div class="radio-reg">
                    <label class="radio">
                        <input type="radio" name="radio" value="student" checked={selectedOption === 'student'} onChange={handleOptionChange}/>
                        <span>Student</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="radio" value="staff" checked={selectedOption === 'staff'} onChange={handleOptionChange}/>
                        <span>Staff</span>
                    </label>
                </div>
                
            {selectedOption === 'student' && (
            <>
                <div className="reg-title">Registration<p>student</p></div>

                <form onSubmit={handleSubmit} className="reg-form">

                    <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" name="fullname" id="fullname" placeholder="Enter full name" onChange={handleInputChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleInputChange} required />
                        </div>
                    </div>


                    {/* <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleInputChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="picture">Picture</label>
                            <input type="file" name="picture" id="picture" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div> */}

                    <div className="reg-input-box">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@astu.edu.et" onChange={handleInputChange} required />
                    </div>


                    <div className="reg-input-box">
                        <input type="file" name="picture" id="picture" accept="image/*" onChange={twoFunctions} />
                        <label htmlFor="picture" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                        {file && (
                                    <img src={file} alt="Uploaded" className="image student-img" />
                        )}
                    </div>


                    {/* <div className="reg-input-box">
                        <label htmlFor="year">Year</label>
                        <input type="text" name="year" id="year" placeholder="Enter year" onChange={handleInputChange} required />
                    </div> */}
{/*

                    <div className="column">
                        <div className="reg-input-box">
                            <label htmlFor="s-year">Year</label>
                            <input type="number" name="s-year" id="s-year" placeholder="Enter School year" onChange={handleInputChange} required />
                        </div>
                        <div className="reg-input-box">
                            <label htmlFor="s-date">Birth Date</label>
                            <input type="date" name="s-date" id="s-date" placeholder="Enter birth date" onChange={handleInputChange} required />
                        </div>
                    </div>


                    <div className="degree-box">
                        <h3>Degree Type</h3>
                        <div className="degree-option">
                            <div className="degree">
                                <input type="radio" id="check-UG" name="degree" value="UG" checked={formData.degreeType === 'UG'} onChange={handleInputChange} />
                                <label htmlFor="check-UG">UG</label>
                            </div>
                            <div className="degree">
                                <input type="radio" id="check-PG" name="degree" value="PG" checked={formData.degreeType === 'UG'} onChange={handleInputChange}/>
                                <label htmlFor="check-PG">PG</label>
                            </div>
                        </div>
                    </div>
*/}

                    <div className="reg-input-box address-box" >
                        <div className="column">
                            <div className="select-box">
                                <select id="depId" name="depId" onChange={handleInputChange} required>
                                    <option hidden>Department</option>
                                    {depts.map((Depart, i) => (
                                        <option key={i} value={Depart.depId}>{Depart.name}</option>
                                        )
                                    )}
                                </select>
                            </div>

                             {/* <input type="text" placeholder="Enter your city" required />  */}
                        </div>
                    </div>

                    <div className="reg-footer">
                        <button className="reg-button">Register</button>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                    <div className="error-reg">{error}</div>
                    
                </form>
            </>
            )}

            {selectedOption === 'staff' && (
            <>
                <div className="reg-title">Registration<p>staff</p></div>

                <form onSubmit={handleStaffSubmit} className="reg-form">

                    <div className="reg-input-box">
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" id="fullname" placeholder="Enter full name" onChange={handleStaffChange} required />
                    </div>

                    <div className="reg-input-box">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@astu.edu.et" onChange={handleStaffChange} required />
                    </div>
                    

                    {/* <div className="x-y-combo">
                        <div className="x-y-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleStaffChange} required />
                        </div>

                        <div className="x-y-box">
                            <label htmlFor="picture">Picture</label>
                            <input type="file" name="picture" id="picture" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div> */}

                    <div className="reg-input-box">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleStaffChange} required />
                    </div>

                    {/* -- Upload Button -- */}

                    <div className="reg-input-box">
                        <input type="file" name="picture" id="picture" accept="image/*" onChange={twoFunctions} />
                        <label htmlFor="picture" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                        {file && (
                                    <img src={file} alt="Uploaded" className="image staff-img" />
                        )}
                    </div>


                    <div className="reg-footer">
                        <button className="reg-button">Register</button>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                    <div className="error-reg">{error}</div>
                    
                </form>
            </>
            )}


            </div>

            <div className='closing-tag'>
                Copyright Ⓒ 2024 Harambee University by Nahi. All rights reserved
            </div>
        </div>


    );
}

export default Register;


