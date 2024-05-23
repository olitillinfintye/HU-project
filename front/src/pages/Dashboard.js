import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
import "../styles/Dashboard.css";
import Modal from 'react-modal';

import SideBar from '../components/SideBar';
import HeadIcon from '../components/HeadIcon';
import Notify from '../components/Notify';
import PostItem from "../helpers/PostItem";
import ip from '../helpers/Config.js';

import { MdEmail, MdAddLocationAlt, MdVerified, MdOutlineCreate, MdDescription, MdSchool } from "react-icons/md";
import { BsFillBookmarkPlusFill, BsFillPeopleFill, BsPersonFill, BsPinMapFill} from "react-icons/bs";
import { FaWalking, FaSchool } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { BiBook, BiSearchAlt } from "react-icons/bi";
import { RiUploadCloud2Fill } from "react-icons/ri";



import logo from "../assets/logo1.png";
import Student_badge from "../assets/badges/Student_badge.png";
import Staff_badge from "../assets/badges/Staff_badge.png";
import user_avatar from '../assets/user_avatar.png';


function Dashboard() {

    const [Visible, setVisible] = useState(false);
    const [switchValue, setSwitchValue] = useState(0);


    const handleSwitchChange = () => {
        setSwitchValue((prevValue) => (prevValue === 0 ? 1 : 0));
      };

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
                    setActiveTab(1);
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
        .then(res => {
            setCurrentUser(res.data.user);
        })
        .catch(err => console.log(err));
    }, [userId, senderType]);
    
    useEffect(() => {
        if (currentUser && !currentUser.isVerified) {
            navigate("/");
        }
    }, [currentUser]);




    // Get All post

    const [allWrite, setAllWrite] = useState('');
    const [allPost, setAllPost] = useState([]);

    const handleAllSearchChange = (event) => {
        setAllWrite(event.target.value);
    };

    useEffect(() => {
        ip.get('/api/staff/viewPost', {
            params: {
                keyword: allWrite,
            },
        })
        .then(res => {setAllPost(res.data);})
        .catch(err => console.log(err));
    }, [allWrite]);


    
    // Get Student Post

    let depart = name.ShortedName;

    const [letter, setLetter] = useState([]);
    const [write, setWrite] = useState('');

    const handleSearchChange = (event) => {
        setWrite(event.target.value);
    };

    useEffect(() => {

        // ip.get('/api/admin/searchPost', {
        //     params: {
        //         keyword: write,
        //     },
        // })

        ip.get('/api/student/viewPost', {
            params: {
                depName: depart,
                keyword: write,
            },
        })
        .then(res => {setLetter(res.data);})
        .catch(err => console.log(err));
    }, [write, depart]);



    // Get MyPost

    const [myPost, SetMyPost] = useState([]);

    useEffect(() => {

        ip.get('/api/staff/myPost', {
            params: {
                staffId: name.staffId,
            },
        })
        .then(res => {SetMyPost(res.data);})
        .catch(err => 
            console.log("there is something wrong in get MyPost")
        );
    }, [name.staffId]);



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



    // Create Post

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        staffId: "",
        categoryId: "",
        eventLocation: "",
        rsvp: 0,
    });

    const handlePost = async (event) => {
        event.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                staffId: name.staffId,
                image: image,
            };

            const response = await ip.post("/api/staff/post", updatedFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            
            setFormData({});
            setImage("");
            window.location.reload();
            console.log(response.data);
            setVisible(false);
        } catch (error) {
            console.log(error.response.data);
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



    // Radio Button Functionality

    const [answer, setAnswer] = useState('');

    const handlePostChange = (e) => {
        const selectedAnswer = e.target.value;              // Make the value of the button the Selected Answer 
        setAnswer(selectedAnswer);
    };


    const DosFunctions = (e) => { 
        handleInputChange(e);
        handlePostChange(e);
        
    }

    // Handle Active Tab

    const [activeTab, setActiveTab] = useState(null);

    const handleClick = (tab) => {
        setActiveTab(tab);
    }

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
        <div>
            <SideBar />
            <div className='Dashboard'>

                <div className='Dashboard-nav'>

                    {senderType === "Staff" &&(
                    <button className='create-btn' onClick={()=>setVisible(true)}>
                        <p>Create Post</p>
                        <MdOutlineCreate className='icon'/>
                    </button>
                    )}


                {/* Modal Body */}

                    <Modal isOpen={Visible} className='create-modal modal-right' style={{overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',}}}>


                        <img src={logo} alt='astu-logo' className='logo'/>

                        <form className='publish-form' onSubmit={handlePost}>
                            <div className="publish-box">
                                <label htmlFor="title">Title<HiPencilAlt/></label>
                                <input className="inputs" type='text' name="title" placeholder="Place Your title here" onChange={handleInputChange} />
                            </div>

                            <div className="publish-box">
                                <label htmlFor="content">Description<MdDescription/></label>
                                <textarea name="content" placeholder="Enter Description" onChange={handleInputChange}></textarea>
                            </div>

                            {/* -- Upload Button -- */}

                            <div className="publish-box">
                                <input className="inputs" type="file" id="image" accept='image/*' onChange={twoFunctions} />
                                <label htmlFor="image" className='upload'><RiUploadCloud2Fill className='icon'/>Upload Image</label>

                                {file && (
                                    <img src={file} alt="Uploaded" className="image" />
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
                                <select id="depId" name="categoryId" onChange={handleInputChange} required>
                                    <option hidden>School</option>
                                    {school.map((scl, i) => (
                                        <option key={i} value={scl.categoryId}>{scl.ShortedName}</option>
                                        )
                                    )}
                                </select>
                            )}


                            {answer === 'department' && (
                                <select id="depId" name="categoryId" onChange={handleInputChange} required>
                                    <option hidden>Department</option>
                                    {depts.map((Depart, i) => (
                                        <option key={i} value={Depart.categoryId}>{Depart.name}</option>
                                        )
                                    )}
                                </select>
                            )}

                            </div>


                            {/* -- Switch RSVP -- */}

                            <div className="switch-box">
                                <span>RSVP</span>
                                <input
                                    className="switch"
                                    type="checkbox"
                                    checked={switchValue === 1}
                                    onChange={handleSwitchChange}
                                />
                            </div>

                            {/* Location */}

                            <div className='switch-box'>
                                <span>Location <BsPinMapFill/></span>
                                <select id="eventLocation" name="eventLocation" className='location-box' onChange={handleInputChange}>
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
                                <button className='publish'>Publish<BsFillBookmarkPlusFill/></button>
                                <button className='close-modal' onClick={()=>setVisible(false)}> Cancel</button>
                            </div>

                        </form>

                    </Modal>

                </div>

                {/* -- Field One -- */}
                
                <div className='field-one'>

                    <div className='profile'>
                        <img src="https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="account-bgr" className="bgr"/>

                        <div className="detail">
                            <img src={user_img} alt="user-img" className="user-img"/>

                            <div className='left'>

                                {senderType === 'Student' ? (
                                <>
                                    <div className="big">{currentUser.fullname}<MdVerified className='verified-student'/></div>
                                    <img src={Student_badge} alt="role" className="role"/>
                                    <div className="small"><MdSchool className='icon'/>{currentUser.depName}</div>
                                </>
                                ):(
                                <>
                                    <div className="big">{currentUser.fullname}<MdVerified className='verified-staff'/></div>
                                    <img src={Staff_badge} alt="role" className="role"/>
                                </>
                                )}

                                {/* <div className="small">Computer Science</div> */}

                            </div>

                            <Link to="/profile" className='edit-btn'>Edit Profile</Link>
                            
                        </div>

                    </div>


                    <div className='posts'>
                        <div className='post-nav'>
                            <button className={`button ${activeTab === null ? 'active' : ''}`} onClick={() => handleClick(null)}>Feed</button>
                            {senderType === 'Student' ? (
                            <>
                                <button className={`button ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleClick(1)}>Personalized</button>
                            </>
                            ):(
                                <button className={`button ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleClick(2)}>My Posts</button>
                            )}
                            
                        </div>


                    {/* ==== SPECIFIC CONTENT ==== */}

                    {activeTab === null && (
                    <>
                        {allPost.length > 0 ? (
                            <div className='post-list'>

                                {allPost.map((item, i) => {
                                    
                                    const postDate = new Date(item.createdAt);
                                    const formattedDate = postDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
                                    const formattedTime = postDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true,});

                                    return (
                                        <PostItem
                                            key={i}
                                            
                                            user_name={item.staffName}
                                            user_image={item.staffImage}
                                            loc={item.eventLocation}
                                            desc={item.content}
                                            title={item.title}
                                            day={formattedDate}
                                            time={formattedTime}
                                            postId={item.postId}
                                            card_image={item.image}
                                            tag={item.categoryName}
                                            summarizable={item.summarizable}
                                            posterId={item.staffId}
                                            likes={item.likes}
                                            likedStd={item.studentIds}
                                            likedStf={item.staffIds}
                                        />
                                    );
                                })}

                            </div>
                        ) : (
                            <div className='post-list'>
                                <p className='no-post'>There is no post yet ..</p>
                            </div>
                        )}
                    </>
                    )}

                    
                    {activeTab === 1 && (
                    <>
                        {letter.length > 0 ? (
                            <div className='post-list'>

                                {letter.map((item, i) => {
                                    
                                    const postDate = new Date(item.createdAt);
                                    const formattedDate = postDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
                                    const formattedTime = postDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true,});
    
                                    return (
                                        <PostItem
                                            key={i}
                                            
                                            user_name={item.staffName}
                                            user_image={item.staffImage}
                                            loc={item.eventLocation}
                                            desc={item.content}
                                            title={item.title}
                                            day={formattedDate}
                                            time={formattedTime}
                                            postId={item.postId}
                                            card_image={item.image}
                                            tag={item.categoryName}
                                            summarizable={item.summarizable}
                                            posterId={item.staffId}
                                            likes={item.likes}
                                        />
                                    );
                                })}

                            </div>
                        ) : (
                            <div className='post-list'>
                                <p className='no-post'>There is no post yet ..</p>
                            </div>
                        )}
                    </>
                    )}


                    {activeTab === 2 && (
                    <>
                        {myPost.length > 0 ? (
                            <div className='post-list'>
                                {myPost.map((item, i) => {
                                    
                                const postDate = new Date(item.createdAt);
                                const formattedDate = postDate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit',});
                                const formattedTime = postDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true,});

                                return (
                                    <PostItem
                                        key={i}
                                        user_name={item.staffName}
                                        user_image={item.staffImage}
                                        loc={item.eventLocation}
                                        desc={item.content}
                                        title={item.title}
                                        day={formattedDate}
                                        time={formattedTime}
                                        postId={item.postId}
                                        card_image={item.image}
                                        tag={item.categoryName}
                                        summarizable={item.summarizable}
                                        posterId={item.staffId}
                                        likes={item.likes}
                                    />
                                );
                                })}
                            </div>
                        ) : (
                            <div className='post-list'>
                                <p className='no-post'>You have not posted yet</p>
                            </div>
                        )}
                    </>
                    )}







                    </div>
                </div>
                <div className='field-two'>

                    <div className='about'>
                        <p>About</p>
                        <div className='entry'><MdEmail className='icon'/>{name.email}</div>
                        <div className='entry'><BsPersonFill className='icon'/>{senderType}</div>
                        {senderType === 'Student' &&(
                            <div className='entry'><BiBook className='icon'/>{currentUser.depName}</div>
                        )}
                        <div className='entry'><MdAddLocationAlt className='icon'/>Ethiopia, Adama</div>
                    </div>

                </div>


                
                {/* Head Icon */}

                <HeadIcon/>

                {senderType === "Student" &&(
                    <Notify/>
                )}

                {/* -- Search Bar -- */}

                {senderType === "Student" ?(
                <div class="search-bar" >
                    <BiSearchAlt className='icon'/>
                    <input placeholder="Search" type="search" class="input" onInput={handleSearchChange}/>
                </div>
                ):(
                <div class="search-bar search-staff" >
                    <BiSearchAlt className='icon'/>
                    <input placeholder="search" type="search" class="input" onInput={handleAllSearchChange}/>
                </div>
                )}
                
                {/* -- -- */}



            </div>
        </div>
    );
}

export default Dashboard;