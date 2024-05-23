import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import axios from "axios";
import "../styles/NavBar.css";

import { FaUser } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { MdArrowForwardIos, MdDashboardCustomize, MdVerified } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";


import logo from "../assets/logo2.png";
import profile_img from "../assets/img_avatar.png";
import user_avatar from '../assets/user_avatar.png';
import ip from '../helpers/Config.js';

function NavBar() {

	const navigate = useNavigate();

	// Get Current User [TOKEN]

    const [name, setName] = useState('');
	const [authState, setAuthState]=useState(false);
	const [senderType, setSenderType] = useState('');
	const [userType, setUserType] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userId, setUserId] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
				setAuthState(true);
                setName(res.data.user.user);

				if (res.data.user.user.hasOwnProperty('studentId')) {
					setUserType('student');
                    setSenderType ('Student');
					setUserEmail(res.data.user.user.email);
					setUserId(res.data.user.user.studentId);
                } else {
					setUserType('staff');
                    setSenderType ('Staff');
					setUserEmail(res.data.user.user.email);
					setUserId(res.data.user.user.staffId);
                }
            }
            else{
				setAuthState(false);
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



	// Logout function

	const logout = () => {
		axios.get('http://localhost:3000/api/logout')
        .then(res => {
            if(res.data.message === "Success"){
				setAuthState(false);
				navigate('/login');
            }
            else{
				alert("error");
            } 
        })
		.catch (err => console.log(err))
	};


    //Pop-Up Functionality

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


	// Send Verification

	const [verify, setVerify]=useState(false);

	const handleGetVerification = async (event) => {
        event.preventDefault();
        try {
            const updatedFormData = {
                email: userEmail,
                userType: senderType,
            };

            const response = await ip.post("/api/student/getVerification", updatedFormData);
			console.log(response.data);
            setVerify(true);
        } catch (error) {
			console.log(error.response.data.message);
		}
    };
	

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
        <div className='nav-bar'>
            <img src={logo} alt='logo' className='nav-logo'/>

				<div className='left-div'>
					<a href="/" className='mid splat'>Home</a>
					{authState &&(
					<a href="/profile" className='mid splat'>{currentUser.fullname}</a>
					)}

					{userType === 'student' && !currentUser.isVerified && (
					<>
						{!verify ? (
							<a href="/#" className='mid verify' onClick={handleGetVerification}>Verify Email</a>
						):(
							<a href="/#" className='mid green'>Email Verification Sent</a>
						)}
					</>
					)}
					

				</div>

				{!authState ? (
					<>
						<a href="/Register" className='loj'>Register</a>
						<a href="/login" className='log'>Login</a>

					</>
				):(
					<>
						{/* <a href="/Profile" className='loj'>Profile</a> */}


						<img onClick={()=> setOpen(!open)} src={user_img} alt='Profile-img' className='profile-img' />

						{/* DropDown */}

						{open && (
							<div className="dropdown" ref={dropdownRef}>
								<div className='triangle'></div>
								<div className='dropdown-pro'>
									<img src={user_img} alt='Profile-img' className='profile-img-min' />

									{senderType === 'Student' ? (
									<>
										<p>{currentUser.fullname}<MdVerified className='verified-student'/></p>
									</>
									):(
									<>
										<p>{currentUser.fullname}<MdVerified className='verified-staff'/></p>
									</>
									)}
								</div>

								<ul>
									<li>										
										<Link to="/profile">
											<div className='dropdown-icons'><FaUser/></div>
											<p>Profile</p>
											<div className='arrow-right'><MdArrowForwardIos/></div>
										</Link>
									</li>
									
									{currentUser.isVerified &&(
									<>
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
									</>
									)}
									

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

					</>
				)}

        </div>
    );
}

export default NavBar;