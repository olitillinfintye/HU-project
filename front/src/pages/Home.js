import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import ip from '../helpers/Config.js';
import "../styles/Home.css";
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

import barc from "../assets/search.png";
import utensil from "../assets/utensil.png";
import trend_icon from "../assets/trend-icon.png";

import PostItem from "../helpers/PostItem";



function Home() {


    // Session Management

	const [authState, setAuthState]=useState(false);
    // const [name, setName] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
        .then(res => {
            if(res.data.status === "Success"){
				setAuthState(true);
                // setName(res.data.user.user);
            }
            else{
				setAuthState(false);
                // setName("Something went wrong");
            } 
        })
    }, []);


    // Get All post

    const [allPost, setAllPost] = useState([]);
    const [write, setWrite] = useState('');

    const handleInputChange = (event) => {
        setWrite(event.target.value);
    };

    useEffect(() => {

        ip.get('/api/admin/searchPost', {
            params: {
                keyword: write,
            },
        })
        .then(res => {setAllPost(res.data);})
        .catch(err => console.log(err));
    }, [write]);


    // Pagination 

    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 4;
    const pagesVisited = pageNumber * postsPerPage;

    const displayPosts = allPost
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map((item, i) => {

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
        });

    const pageCount = Math.ceil(allPost.length / postsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    // Scroll

    const scrollToDiv = () => {
        const element = document.getElementById('myDiv');
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };


    return (
        <div className='hmain'>
            <NavBar />

            {/* Header Section */}
            <div className='homey'>

                <div className='home-write'>
                    <div className='z-words'>
                        <h1 className='m-title'>Do your best work, supported by your Adama Science and Technology</h1>
                        <h4 className='m-desc'>astu interactive Feed lets members publish directly to students and other audience, without getting into any hassle.</h4>
                    </div>
                    <button className='more-button-one' onClick={scrollToDiv}>Start Reading</button>

                {!authState && (
                    <Link  to="/register" className='more-button-two'>Register</Link>
                )}
                    
                </div>
                
                <img src={utensil} alt='utensil' className='utensil'/>


                {/* Search Section */}
                <div className='input-box'>
                    <img src={barc} alt='barc' className='bicon'/>
                    
                    <i className="uil uil-search"></i>
                    <input type="text" placeholder="Search here..." onInput={handleInputChange}/>
                    <button className="button">Search</button> 
                </div>

            </div>


            {/* Middle Header Place */}

            <div className='mid-head'>
                <h3 className='mid-title'><img src={trend_icon} alt='latest' className='trend-icon'/>Latest posts</h3>
            </div>

        
        {/* POST Section */}

            <div className='post' id="myDiv">


                    {displayPosts}

                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />


                    {/* POST APi */}

                    {/* {posts.map((item, i) => (
                            <PostItem
                                key={i}

                                user_name={item.staffName}
                                loc={item.eventLocation}
                                desc={item.content}
                            />
                        )
                    )} */}




            {/* Message BOARD */}

            {!authState ? (
                <>
                    <div  className='discussions-board'> Noting to see</div>
                    
                </>
            ):(
                <>
                    
                    <div className='discussions-board'>

                        <div className='board-upper'><p>Discussion Board</p></div>

                        <div className='board-body'>
                            <div class="desc-board">
                                    <div class="photo" style={{backgroundImage:"url(https://i.pinimg.com/564x/0f/91/5a/0f915a0565ffb4470a78552eed75ac83.jpg)",} }></div>
                                    
                                    <div class="desc-contact">
                                        <p class="desc-title">Day Corlew</p>
                                        <p class="desc-message">property is used to break the long words and wrap onto the next ..</p>
                                    </div>

                                    <div class="desc-timer">3 min</div>
                            </div>

                            <div class="desc-board">
                                    <div class="photo" style={{backgroundImage:"url(https://i.pinimg.com/564x/0f/91/5a/0f915a0565ffb4470a78552eed75ac83.jpg)",}}></div>
                                    
                                    <div class="desc-contact">
                                        <p class="desc-title">Campus Group</p>
                                        <p class="desc-message">Let's meet for a coffee CSS word-wrap property is used to break the long words.</p>
                                    </div>
                                    
                                    <div class="desc-timer">35 min</div>
                            </div>

                            <div class="desc-board">
                                    <div class="photo" style={{backgroundImage:"url(https://i.pinimg.com/564x/0f/91/5a/0f915a0565ffb4470a78552eed75ac83.jpg)",}}></div>
                                    
                                    <div class="desc-contact">
                                        <p class="desc-title">School Board Meeting</p>
                                        <p class="desc-message">Let's meet for a coffee CSS word-wrap property is used ...</p>
                                    </div>
                                    
                                    <div class="desc-timer">1 hour</div>
                            </div>

                        </div>

                        <div className='board-lower'>
                            <Link className='btn-discussion' to="/chat" >Discussion</Link>
                        </div>
                        
                    </div>
                </>
            )}  
            
            {/* Message BOARD - END */}

                    
                    
            </div>

            {/* Footer */}

            <Footer />

        </div>
    
        
    );
}

export default Home;