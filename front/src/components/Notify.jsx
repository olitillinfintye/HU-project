import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import ip from '../helpers/Config.js';

import "../styles/Notify.css";

import { MdNotifications } from "react-icons/md";
import user_avatar from '../assets/img_avatar.png';
import user_avatar2 from '../assets/img_avatar2.png';

function Notify() {


    // Get Current User

    const [name, setName] = useState('');
    const [senderType, setSenderType] = useState('');
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                setName(res.data.user.user);

                if (res.data.user.user.hasOwnProperty('studentId')) {   // sender type declaration
                    setSenderType('Student');
                    setUserType('student');
                    setUserId(res.data.user.user.studentId);
                } else {
                    setSenderType('Staff');
                    setUserType('staff');
                    // setUserId(res.data.user.user.staffId);
                }

            }
            else{
                setName("Something went wrong");
            } 
        })
    }, []);



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



    // get Notifications

    const [notification, setNotification] = useState('');
    const [notifyNum, setNotifyNum] = useState('');

    useEffect(() => {
        ip.get('/api/staff/getRsvp', {
            params: {
                userType: 'Student',
                userId: userId,
            },
        })

        .then(response => {
            setNotification(response.data);
            setNotifyNum(notification.totalRsvp);

        })
        .catch(err => console.log(err));
    }, [userId, open, notification.totalRsvp]);



    // update Notification

    const updateNotification = () => {
        const requestBody = {
            rsvpData: notification.rsvpData,
            userType: 'Student',
            userId: userId,
        };

        ip.put('/api/staff/putRsvp', requestBody )
        .then(response => {
            console.log(response.data);
            // console.log(requestBody);
        })
        .catch(err => console.log(err));
    };



    return (
        <div className='head-notify'>

            <div className='notification' onClick={()=>{setOpen(!open); updateNotification(); setNotifyNum(0)}}>
                <div className='perspective'>
                    <MdNotifications className='icon'/>
                    {notifyNum !== 0 &&
                        <span>{notifyNum}</span>
                    }
                </div>
            </div>

            {open && (
                <div className="notify-dropdown" ref={dropdownRef}>
                    <div className='triangle'></div>

                    <p>Notifications</p>
                    
                {notification.length > 0 ? (
                    <div className='content-scroll'>
                        {notification.rsvpData.map((notfic, i) => (
                        <div className='content' key={i} >
                            <img src={user_avatar} alt='icon-img'/>

                            <div className='block'>
                                <div className='line'><b>{notfic.text}</b></div>
                                <div className='loc'>Space</div>
                            </div>
                        </div>
                        ))}
                    </div>
                ) : (
                    <div className='content-scroll max'>
                        <div>You have no new notification</div>
                    </div>
                )}


                </div>
            )}
            
        </div>
    );
}

export default Notify;