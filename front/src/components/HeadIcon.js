import React from 'react';
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';

import "../styles/NavBar.css";
import "../styles/HeadIcon.css";
import ip from '../helpers/Config.js';

import { FaUser } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { MdArrowForwardIos, MdDashboardCustomize, MdVerified } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

// import profile_img from "../assets/img_avatar.png";
import user_avatar from '../assets/user_avatar.png';



function HeadIcon() {

    const [authState, setAuthState]=useState(false);
	const navigate = useNavigate();

	// Pop-Up Functionality

    const [open, setOpen]=useState(false);
	const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    

	// Logout function

	const logout = () => {
		axios.get('http://localhost:3000/api/logout')
        .then(res => {
            if(res.data.message === "Success"){
				setAuthState(false);
				navigate('/login');
				window.location.reload();
            }
            else{
				alert("error");
            } 
        })
		.catch (err => console.log(err))
	};


	// Get Current User

    const [name, setName] = useState('');
	const [senderType, setSenderType] = useState('');
	const [userId, setUserId] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                setName(res.data.user.user);

				if (res.data.user.user.hasOwnProperty('studentId')) {
                    setSenderType ('Student');
					setUserId(res.data.user.user.studentId);
                } else {
                    setSenderType ('Staff');
					setUserId(res.data.user.user.staffId);
                }
            }
            else{
                setName("Something went wrong");
            } 
        })
    }, []);


	// Get Current User [Database]

	const [currentUser, setCurrentUser] = useState('');

	useEffect(() => {
        ip.get('/api/currentUser', {
            params: {
                userId: userId,
				userType: senderType,
            },
        })
        .then(res => {setCurrentUser(res.data.user);})
        .catch(err =>console.log(err))
    }, [userId, senderType]);



	// Default User image

    let user_img = '';
    let user_image = currentUser.picture;

    if (user_image === null || user_image === undefined) {
        user_img = user_avatar;
    } else {
        user_img = user_image.replace('Images', '');
        user_img = `http://localhost:3000${user_img}`;
    }


    return (
        <div className='HeadIcon'>
                        <img onClick={()=> setOpen(!open)} src={user_img} alt='Profile-img' className='profile-img' />

                        {open && (

                        <div className="dropdown" ref={dropdownRef}>
								<div className='triangle'></div>
								<div className='dropdown-pro'>
									<img src={user_img} alt='Profile-img' className='profile-img-min' />
									{/* <p>{name.fullname}<MdVerified/></p> */}

									{senderType === 'Student' ? (
									<>
										<p>{currentUser.fullname}<MdVerified className='verified-student'/></p>
									</>
									):(
									<>
										<p>{currentUser.fullname}<MdVerified className='verified-staff'/></p>
									</>
									)}

									{!authState && (
										<Link to="/login"></Link>
									)
									}

								</div>

								<ul>
									<li>										
										<Link to="/profile">
											<div className='dropdown-icons'><FaUser/></div>
											<p>Profile</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>									
										<Link to="/dashboard">
											<div className='dropdown-icons'><MdDashboardCustomize/></div>
											<p>Dashboard</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>
										<Link to="/chat">
											<div className='dropdown-icons'><BsFillChatRightTextFill/></div>
											<p>Chat</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

									<li>
										<Link onClick={logout}>
											<div className='dropdown-icons'><IoLogOut/></div>
											<p>Logout</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>

								</ul>

							</div>
                            
                            )}
            
        </div>
    );
}

export default HeadIcon;