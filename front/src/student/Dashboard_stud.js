import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

import "../styles/Dashboard_stud.css";
import Modal from 'react-modal';    // import modal

import SideBar_Stud from '../components/SideBar_Stud';
import HeadIcon from '../components/HeadIcon';      //HeadIcon
import { PostList } from "../helpers/PostList";
import PostItem_stud from "../helpers/PostItem_stud";


import { MdEmail, MdAddLocationAlt, MdCall } from "react-icons/md";
import { BsFillBookmarkPlusFill, BsFillPeopleFill, BsPersonFill } from "react-icons/bs";
import { FaWalking, FaSchool } from "react-icons/fa";                  //walking + School icon
import { RiAddCircleFill, RiUploadCloud2Fill } from "react-icons/ri";                  //upload + Add icon 
import logo from "../assets/hu_badge.png";
import student_badge from "../assets/badges/Student_badge.png";      //Teacher Badge


function Dashboard_stud() {

    // Modal Functionality

    const [Visible, setVisible] = useState(false);


    // Upload Image Preview

    const [file, setFile] = useState();

    function getFile(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    // const twoFunctions = (e) => {
    //     getFile(e);
    //     handleInputChange(e);
    // }



    // Radio Button Functionality

    const [answer, setAnswer] = useState('');

    const handlePostChange = (e) => {
        const selectedAnswer = e.target.value;              // Make the value of the button the Selected Answer 
        setAnswer(selectedAnswer);
    };


    const DosFunctions = (e) => { 

        handlePostChange(e);
        
    }

    // Handle Active Tab

    const [activeTab, setActiveTab] = useState(null);

    const handleClick = (tab) => {
        setActiveTab(tab);
    }


    return (
        <div>
            <SideBar_Stud />
            <div className='Dashboard'>

                <div className='Dashboard-nav'>
                    


                {/* Modal Body */}

                    <Modal isOpen={Visible} className='create-modal' style={{overlay: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',}}}>


                        <img src={logo} alt='astu-logo' className='logo'/>



                


                    {/* -- Radio-Button Ends -- */}

                            <div className='bottom-btn'>
                                <button className='publish'>Publish<BsFillBookmarkPlusFill/></button>
                                <button className='close-modal' onClick={()=>setVisible(false)}> Cancel</button>
                            </div>

                    

                    </Modal>

                </div>

                
                <div className='field-one'>

                    <div className='profile'>
                        <img src="https://images.unsplash.com/photo-1545703549-7bdb1d01b734?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="account-bgr" className="bgr"/>

                        <div className="detail">
                            <img src="https://i.pinimg.com/564x/bf/d6/b5/bfd6b5ead3e81c7d0ff530a2a6c98de3.jpg" alt="user-img" className="user-img"/>

                            <div className='left'>
                                <div className="big">Milkias Solomon</div>
                                <img src={student_badge} alt="role" className="role"/>
                                <div className="small">Computer Science</div>
                                <div className="small"><RiAddCircleFill className='icon' /> astu, Adama</div>
                            </div>

                            <Link to="/profile_stud" className='edit-btn'>Edit Profile</Link>
                            
                        </div>

                    </div>


                    <div className='posts'>
                        <div className='post-nav'>
                            <button className={`button ${activeTab === null ? 'active' : ''}`} onClick={() => handleClick(null)}>Feed</button>
                            <button className={`button ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleClick(1)}>Personalized</button>
                        </div>

                    {activeTab === null && (
                    <>
                        <div className='post-list'>

                            {/* POST Custom */}

                            {PostList.map((Item, keys) => {
                                return (
                                    <PostItem_stud
                                        key={keys}
                                        
                                        user_name={Item.user_name}
                                        user_image={Item.user_image}
                                        user_badge={Item.user_badge}
                                        card_image={Item.card_image}
                                        tag= {Item.tag}
                                        title= {Item.title}
                                        desc= {Item.desc}
                                        time={Item.time}
                                        date={Item.date}
                                        loc={Item.loc}
                                    />
                                );
                            })}

                            <PostItem_stud/>

                        </div>
                    </>
                    )}

                    
                    {activeTab === 1 && (
                    <>
                        <div className='post-list'>

                            {/* POST Custom */}

                            {PostList.map((Item, keys) => {
                                return (
                                    <PostItem_stud
                                        key={keys}
                                        
                                        user_name={Item.user_name}
                                        user_image={Item.user_image}
                                        user_badge={Item.user_badge}
                                        card_image={Item.card_image}
                                        tag= {Item.tag}
                                        title= {Item.title}
                                        desc= {Item.desc}
                                        time={Item.time}
                                        date={Item.date}
                                        loc={Item.loc}
                                    />
                                );
                            })}

                            <PostItem_stud/>

                        </div>
                    </>
                    )}


                    </div>
                </div>
                <div className='field-two'>

                    <div className='about'>
                        <p>About</p>
                        <div className='entry'><MdEmail className='icon'/>milkias0972@gmail.com</div>
                        <div className='entry'><BsPersonFill className='icon'/>Student</div>
                        <div className='entry'><MdCall className='icon'/>+251-953-6459-08</div>
                        <div className='entry'><MdAddLocationAlt className='icon'/>Ethiopia, Adama</div>
                    </div>

                </div>


                
                {/* Head Icon */}

                <HeadIcon/>


            </div>
        </div>
    );
}

export default Dashboard_stud;