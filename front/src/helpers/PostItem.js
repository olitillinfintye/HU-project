import React from "react";
import {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';
import ip from '../helpers/Config.js';
import axios from "axios";

import date_icon from "../assets/date_icon.png";
import map_icon from "../assets/map_icon.png";
import avatar_img1 from "../assets/img_avatar.png";
// import avatar_img1 from '../assets/user_avatar.png';
// import Staff_badge from "../assets/badges/Staff_badge.png";

import { BsFillBookmarkPlusFill, BsFillPeopleFill, BsFillHeartFill, BsRobot, BsPinMapFill, BsBookmarkCheckFill } from "react-icons/bs";
import { IoOptionsOutline } from "react-icons/io5";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { FaWalking, FaSchool } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5"; 
import { MdVerified, MdDescription } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";


// Maps
import logo from "../assets/logo1.png";
import B507 from "../assets/loc/b507.png";
import B508 from "../assets/loc/b508.png";
import B509 from "../assets/loc/b509.png";


function PostItem({ user_image, user_name, user_badge, card_image, tag, title, desc, time, date, loc, day, postId, summarizable, posterId, likes, likedStd, likedStf}) {


    const [Popup, setPopup] = useState(false); 
    const [deletePop, setDeletePop]=useState(false);

    // Get Current User

    const [name, setName] = useState('');
    const [userType, setUserType] = useState('');
    const [senderType, setSenderType] = useState('');
    const [userId, setUserId] = useState('');

	axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
                setName(res.data.user.user);

                if (res.data.user.user.hasOwnProperty('studentId')) {
                    setSenderType('student');
                    setUserType('Student');
                    setUserId(res.data.user.user.studentId);
                } else {
                    setSenderType('staff');
                    setUserType('Staff');
                    setUserId(res.data.user.user.staffId);
                }
            }
            else{
                setName("Something went wrong");
            } 
        })
    }, []);



    //Update Pop-Up Functionality

    const [open, setOpen]=useState(false);          //Update Functionality
    const [locate, setLocate]=useState(false);          //Map Functionality
    const [summary, setSummary]=useState(false);          //Summary Functionality

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
                setSummary(false);
                setLocate(false);
                setDeletePop(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);



    // mapping location to image
    
    const getImageByLoc = (loc) => {
        switch (loc) {
            case 'B-507': return B507;
            case 'B-508': return B508;
            case 'B-509': return B509;
            case 'Space': return B507;
            case 'astu Stadium': return B508;
            default: return null;
        }
    };

    const imageSrc = getImageByLoc(loc)




    // Update Post

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        categoryId: "",
        eventLocation: "",
    });

    const handleUpdatePost = async (event) => {
        event.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                staffId: name.staffId,
                postId: postId,
                image: image,
            };
    
            const response = await ip.put("/api/staff/updatePost", updatedFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            setFormData({});
            setImage("");
    
            console.log(response.data);
            setPopup(false);
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

    // Radio Button Functionality

    const [answer, setAnswer] = useState('');

    const handlePostChange = (e) => {
        const selectedAnswer = e.target.value;
        setAnswer(selectedAnswer);
    };


    const DosFunctions = (e) => { 
        handleUpdateChange(e);
        handlePostChange(e);    
    }



    // Get Department

    const [depts, setDepts] = useState([]);

    useEffect(() => { 
        ip.get('/api/staff/getDep')
        .then(response => setDepts(response.data))
        .catch(err => console.log(err));
    }, []);


    // Get School

    const [school, setSchool] = useState([]);

    useEffect(() => { 
        ip.get('/api/staff/getSchool')
        .then(response => setSchool(response.data))
        .catch(err => console.log(err));
    }, []);



    // Delete Post

    const deletePost = () => {
        const requestBody = {
            postId: postId
        };

        ip.delete('/api/staff/deletePost', { data: requestBody })
        .then(response => {
            console.log(response.data);
            setDeletePop(!deletePop);
            window.location.reload();
        })
        .catch(err => console.log(err));
    };


    // Fix Post Image Path

    let newPath = '';

    if (card_image === null || card_image === undefined) {
        newPath = null;
    } else {
        newPath = card_image.replace('Images', '');
    }

    
    // Default Staff image

    let Staff_img = '';

    if (user_image === null || user_image === undefined) {
        Staff_img = avatar_img1;
    } else {
        Staff_img = user_image.replace('Images', '');
        Staff_img = `http://localhost:3000${Staff_img}`;
    }

    // Like Post api

    const handleLikePost = async (event) => {
        try {
            const updatedFormData = {
                postId: postId,
                liked_by_id : userId,
                liked_by_type: senderType,
            };
            const response = await ip.post("/api/student/likePost", updatedFormData);
			console.log(response.data);
        } catch (error) {
			console.log(error.response.data);
		}
    };


    // liked by current user

    const currentUserID = userId

    const [didLike, setDidLike] = useState(false); // Ensure initial value is set to false

    useEffect(() => {
        if (userType === "Student" && Array.isArray(likedStd)) {
            if (likedStd.includes(currentUserID.toString())) {
            setDidLike(true);
            }
        }
        if (userType === "Staff" && Array.isArray(likedStf)) {
            if (likedStf.includes(currentUserID.toString())) {
            setDidLike(true);
            }
        }
        }, [likedStd,likedStf,didLike,userId,userType]);


    // Like Logic

    const [likeCount, setLikeCount] = useState(likes);
    const [liked, setLiked] = useState(false);

    useEffect(() => {

        if( didLike === true){
            setLiked(true);
        }

    }, [ didLike]);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    // addition




    return (
        <div className="card">

            {/* API LOGIC */}
                        
                        <div className="card__header">
                            <div className="user_info">
                                <img src={Staff_img} alt="user_image" className="user_image"/>
                                <h5 className="user_name">{user_name}</h5>
                                {/* <img src={user_badge} alt="user_badge" className="user_badge"/> */}
                                <MdVerified className="user_badge"/>
                                
                                {userType === "Staff" && posterId === name.staffId && (
                                <BsBookmarkCheckFill className="my-post-icon"/>
                                )}

                                <IoOptionsOutline className="options" onClick={()=> setOpen(!open)}/>

                                {open && (
                                <div className="update" ref={dropdownRef}>
                                    {userType === "Staff" && posterId === name.staffId && (
                                    <>
                                    <div className="line" onClick={()=>{setPopup(true); setOpen(!open);}} >Update</div>
                                    <div className="line" onClick={()=>{setOpen(!open); setDeletePop(!deletePop);}} >Delete</div>
                                    </>
                                    )}
                                    <div className="line" onClick={()=> setOpen(!open)}>Exit</div>
                                </div>
                                )}

                                {deletePop && (
                                <div className='delete' ref={dropdownRef}>
                                    <div className='icon'><IoWarningOutline className="image"/></div>
                                    <p>Are you sure you want to delete this Post ?</p>
                                    <button onClick={deletePost}>Delete</button>
                                    <button className='cancel' onClick={()=> setDeletePop(false)}>Cancel</button>
                                </div>
                                )}

                                
                        {/* Update Modal */}

                                <Modal isOpen={Popup} className='create-modal' style={{overlay: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',}}}>


                                    <img src={logo} alt='astu-logo' className='logo'/>

                                    <form className='publish-form' onSubmit={handleUpdatePost}>

                                        <div className="publish-box">
                                            <label htmlFor="title">Title<HiPencilAlt/></label>
                                            <input className="inputs" type='text' name="title"  placeholder={title} onChange={handleUpdateChange} />
                                        </div>

                                        <div className="publish-box">
                                            <label htmlFor="content">Description<MdDescription/></label>
                                            <textarea name="content" placeholder="Enter Description" onChange={handleUpdateChange}>{desc}</textarea>
                                        </div>

                                    {/* -- Upload Button -- */}

                                        <div className="publish-box">
                                            <input  className="inputs" type="file" id="image" accept='image/*' onChange={twoFunctions} />
                                            <label htmlFor="image" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                                            {file && (
                                                <img src={file} alt="Uploaded-File" className="image"/>
                                            )}
                                        </div>


                                    {/* -- Radio Button -- */}

                                    <div className='publish-radio'>
                                        <div className="publish-to">
                                            <div className="audience">
                                                <input className='inputs' type="radio" name='categoryId' value="1" checked={answer === '1'} onChange={DosFunctions} />
                                                <div className='Radio-tile'>
                                                    <BsFillPeopleFill className='icon'/>
                                                    <span>ALL</span>
                                                </div>
                                            </div>  
                                            
                                            <div className="audience">
                                                <input className='inputs' type="radio" name="category"  value="school" checked={answer === 'school'} onChange={DosFunctions}/>                                    
                                                <div className='Radio-tile'>
                                                    <FaSchool className='icon'/>
                                                    <span>SCL</span>
                                                </div>
                                            </div>

                                            <div className="audience">
                                                <input className='inputs' type="radio" name="category" value="department" checked={answer === 'department'} onChange={DosFunctions}/>
                                                <div className='Radio-tile'>
                                                    <FaWalking className='icon'/>
                                                    <span>DEPT</span>
                                                </div>
                                            </div>
                                        </div>



                                        {answer === 'school' && (
                                        <select id="depId" name="categoryId" onChange={handleUpdateChange} required>
                                            <option hidden>School</option>
                                            {school.map((scl, i) => (
                                                <option key={i} value={scl.categoryId}>{scl.ShortedName}</option>
                                                )
                                            )}
                                        </select>
                                        )}


                                        {answer === 'department' && (
                                        <select id="depId" name="categoryId" onChange={handleUpdateChange} required>
                                            <option hidden>Department</option>
                                            {depts.map((Depart, i) => (
                                                <option key={i} value={Depart.categoryId}>{Depart.name}</option>
                                                )
                                            )}
                                        </select>
                                        )}

                                    </div>

                                        {/* -- Location -- */}

                                        <div className='switch-box'>
                                            <span>Location<BsPinMapFill/></span>
                                            <select id="eventLocation" name="eventLocation" className='location-box' onChange={handleUpdateChange}>
                                                <option hidden>Area</option>
                                                <option value='Space'>Space</option>
                                                <option value='B-507'>B-507</option>
                                                <option value='B-508'>B-508</option>
                                                <option value='Registrar'>Registrar</option>
                                                <option value='Library'>Library</option>
                                                <option value='Lab'>Lab</option>
                                                <option value='Finance'>Finance</option>
                                                <option value='astu Stadium'>astu Stadium</option>
                                            </select>
                                        </div>


                                        {/* -- Radio-Button Ends -- */}

                                        <div className='bottom-btn'>
                                            <button className='publish'>Update<BsFillBookmarkPlusFill/></button>
                                            <button className='close-modal' onClick={()=>setPopup(false)}> Cancel</button>
                                        </div>

                                    </form>

                                </Modal>


                    {/* END- Modal */}


                            </div>

                            {newPath !== null &&(
                                <img src={`http://localhost:3000${newPath}`} alt="card_image" className="card_image" width="600"/>
                            )}

                        </div>

                        <div className="card__body">
                            <span className="tag tag-red">{tag}</span>
                            <h4 className='title'>{title}</h4>
                            <p className='desc'>{desc}</p>


                            {summarizable !== "0" &&(
                            <button className="summary-btn" onClick={()=> setSummary(!open)}>
                                <p>Summarize</p>
                            </button>
                            )}

                            {summary && (
                            <div className="summary" ref={dropdownRef}>
                                <div className="upper"><span>Summary</span><BsRobot className="icon"/></div>
                                <p>{summarizable}</p>
                                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="12%" y1="83%" x2="88%" y2="17%"><stop offset="5%" stop-color="#cb2d3e"></stop><stop offset="95%" stop-color="#f78da7"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,133 0,133 C 144.10714285714283,151.96428571428572 288.21428571428567,170.92857142857142 406,174 C 523.7857142857143,177.07142857142858 615.2500000000001,164.25 734,148 C 852.7499999999999,131.75 998.7857142857142,112.07142857142857 1121,109 C 1243.2142857142858,105.92857142857143 1341.607142857143,119.46428571428572 1440,133 C 1440,133 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="12%" y1="83%" x2="88%" y2="17%"><stop offset="5%" stop-color="#cb2d3e"></stop><stop offset="95%" stop-color="#f78da7"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,266 0,266 C 134.42857142857144,249.64285714285714 268.8571428571429,233.28571428571428 396,223 C 523.1428571428571,212.71428571428572 643.0000000000001,208.49999999999997 765,224 C 886.9999999999999,239.50000000000003 1011.1428571428571,274.7142857142857 1124,285 C 1236.857142857143,295.2857142857143 1338.4285714285716,280.6428571428571 1440,266 C 1440,266 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
                            </div>
                            )}
                            
                        </div>

                        <div className="card__footer">
                            <div className="supplies">
                                <img src={date_icon} alt="date_icon" className="date_icon"/>
                                <div className="date_info">
                                    <h5>{day}</h5>
                                    <small>{time}</small>
                                </div>
                            </div>
                            
                            <div className="mid">
                                <div className="location" onClick={()=> setLocate(!locate)}>
                                    <img src={map_icon} alt="map_icon" className="map_icon"/>
                                    <h5>{loc}</h5>
                                </div>

                                {locate && (
                                <div className="location-img" ref={dropdownRef}>
                                    <img src={imageSrc} alt="loc_image"/>
                                </div>
                                )}
                            </div>
                            
                            {userId && (
                                <div className="like-heart">
                                <label className="like-container">
                                    <input type="checkbox" onClick={() => {handleLike(); handleLikePost();}} />
                                    <BsFillHeartFill className={`svg ${liked ? 'svg-red' : ''}`} />
                                </label>
                                <p>{likeCount}</p>
                                </div> 
                            )}

                            {/* <div className="like-heart">
                                <label className="like-container">
                                    <input type="checkbox" onClick={() => {handleLike(); handleLikePost();}} />
                                    <BsFillHeartFill className={`svg ${liked ? 'svg-red' : ''}`} />
                                </label>
                                <p>{likeCount}</p>
                            </div> */}
                        </div>
        </div>
    );
}

export default PostItem;