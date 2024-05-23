import React from 'react';
import "../styles/Profile.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';
import ip from '../helpers/Config.js';

import SideBar from '../components/SideBar';      //SideBar
import HeadIcon from '../components/HeadIcon';      //HeadIcon
import Notify from '../components/Notify';

import user_avatar from '../assets/user_avatar.png';

import { RiUploadCloud2Fill } from "react-icons/ri";


function Profile() {


    // Get Current User
    const [name, setName] = useState('');
    const [senderType, setSenderType] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate(); 

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
        .catch(err => {
            console.log(err);
            navigate("/");
        });
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



    // Update Post

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        fullname: "",
    });

    const handleUpdatePost = async (event) => {
        event.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                staffId: name.staffId,
                picture: image,
            };
    
            const response = await ip.put("/api/staff/staffUpdate", updatedFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            setFormData({});
            setImage("");
    
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.log(error.response.data);
        }
    };
    

    const handleUpdateChange = (event) => {
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






    // Create Option/Preference

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const createOption = async () => {

        try {
            const data = {
                categoryId: document.getElementById('depId').value,
                userId: userId,
                userType: senderType,
            };
        
            const response = await axios.post('http://localhost:3000/api/staff/createOpt', data);
            window.location.reload();
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError(error.response.data.message);
            setMessage('');
        }
    };




    // Get Department

    const [depts, setDepts] = useState([]);

    useEffect(() => { 
        ip.get('/api/student/getDep')
        .then(response => setDepts(response.data))
        .catch(err => console.log(err));
    }, []);



    // Get Option/Preference

    const [options, setOptions] = useState([]);

    useEffect(() => { 
        ip.get('/api/staff/getOpt', {
            params: {
                userType: senderType,
                userId: userId,
            },
        })
        .then(response => setOptions(response.data.data))
        .catch(err => console.log(err));
    }, [senderType, userId]);



    // Delete Options/Preference

    const deleteOption = (optionId) => {
        ip.delete('/api/staff/deleteOpt', {
            params: {
                userId: userId,
                userType: senderType,
                optionId: optionId,
            },
        })
        .then(response => {
            window.location.reload();
        })
        .catch(err => console.log(err));
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
        <div className='account-setting'>
            <SideBar />

            <div className="account-setup">
                <div className="title">Account Setting</div>

                <form className="account-update"> 
                    <div className="account-div">
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" id="fullname" placeholder={currentUser.fullname} onChange={handleUpdateChange} required />
                    </div>

                    <div className="account-div">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@astu.edu.et" value={currentUser.email} />
                    </div>

                    <div className="account-div-box">
                        <input type="file" name="picture" id="picture" accept="image/*" onChange={twoFunctions} />
                        <label htmlFor="picture" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                        {file && (
                                    <img src={file} alt="Uploaded" className="image staff-img" />
                        )}
                    </div>

                    
                    <div className="flex">
                        <button className="reg-button" onClick={handleUpdatePost}>Update</button>

                        <Link className='password' to="/reset">Change Password</Link>
                    </div>
                


                    <div className="account-div">
                        <label htmlFor="option">Preference</label>

                        <div className='Preference'>
                            <select id="depId" name="depId">
                                {depts.map((Depart, i) => (
                                    <option key={i} value={Depart.categoryId}>{Depart.name}</option>
                                    )
                                )}
                            </select>

                            <div className='add' onClick={createOption}>Add+</div>
                        </div>
                        <p className='add-message'>{message}</p>
                        <p className='add-error'>{error}</p>

                    </div>

                </form>

            </div>


            
            <div className='account-card'>
                <img src="https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="account-bgr" className="account-bgr"/>


                <div className="card-banner">
                    <img src={user_img} alt="account-user-img" className="account-user-img"/>

                    <div className="card-banner-space"></div>
                    <div className="card-banner-big">{currentUser.fullname}</div>
                    <div className="card-banner-small">{currentUser.depName}</div>
                    <div className="card-banner-tag">{senderType}</div>

                    {!currentUser.isVerified ? (
                        <div className="card-banner-verified">this is a non-verified user of the astu Interactive Feed website. login to participate and contribute to the platform</div>
                    ) : (
                        <div className="card-banner-text">This is a verified member of the astu Interactive Feed website is a valuable contributor to the platform.</div>
                    )}

                    <div className="card-banner-options">
                    {options.map((option, i) => (
                            <span key={i}>
                                {option.categoryName}
                                <div className='close' onClick={() => deleteOption(option.optionId)}>x</div>
                            </span>
                        )
                    )}
                    </div>
                    
                </div>

            </div>

            <HeadIcon />

            {senderType === 'Student' &&(
                <Notify />
            )}

        </div>
    );
}

export default Profile;