import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import "../styles/Chat.css";
import ip from '../helpers/Config.js';
import SideBar from '../components/SideBar';
import user_avatar from '../assets/user_avatar.png';

import { IoSend, IoSearch, IoWarningOutline, IoOptionsSharp, IoCreate } from "react-icons/io5"; 
import { RxChevronLeft } from "react-icons/rx";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { VscVerified } from "react-icons/vsc";
import { FcAddDatabase } from "react-icons/fc";

import { io } from "socket.io-client";

function Chat() {

    const [deletePop, setDeletePop]=useState(false);
    const [settingPop, setSettingPop]=useState(false);
    const [create, setCreate]=useState(false);
    const [name, setName] = useState('');
    const [senderType, setSenderType] = useState('');
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');
    const [prefer, setPrefer] = useState(false);
    const [selectedOption, setSelectedOption] = useState('general');
    const [passId, setPassId] = useState('');
    const [messages, setMessages] = useState('');
    const [activeChat, setActiveChat] = useState('0');
    const [activeChatID, setActiveChatID] = useState(null);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [topic, setTopic] = useState([]);
    const [creatorId, setCreatorId] = useState([]);
    const [creatorType, setCreatorType] = useState([]);
    const [depts, setDepts] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const navigate = useNavigate(); 

    const [chatData, setChatData] = useState({
        topic: '',
        restrictedMode: '0',
        categoryId: '',
    });

    const dropdownRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [messages,activeChatID]);

      const [socket, setSocket] = useState(io("http://localhost:8000"));

      useEffect(() => {
        const skt = io("http://localhost:8000");
    
        setSocket(skt);
        socketOperation();
      }, [chatId,activeChat]);
    
      function socketOperation() {
       
        socket.on("breadcastMessage", (data) => {
          const msg = {
            from: data.from,
            message: data.message,
            senderType: data.senderType,
            userId: data.userId,
          };
          if(activeChatID===data.chatId){
            getAllMessages();
          }
          
    
          // setMessage((oldMessage) => [...oldMessage, msg]);
          // console.log(data);
        });
      }


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setCreate(false);
                setDeletePop(false);
                setSettingPop(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    // Get Current User
    
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
                } else if(res.data.user.user.hasOwnProperty("staffId")) {
                    setSenderType("Staff");
                    setUserType("staff");
                    setUserId(res.data.user.user.staffId);
                    }
                    else {
                    setSenderType("Admin");
                    setUserType("admin");
                    setUserId(res.data.user.user.adminId);
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



    // send message

    const sendMessage = async () => {
        const type= userType;

        let user = '';
        if (userType === 'student') {
            user = name.studentId;
        } else if (userType === 'staff') {
            user = name.staffId;
        }

        const chatId = activeChatID;
        const message = messages;
        try {
        const data = {message: message, userId: user, senderType: type, chatId: chatId};

        const response = await axios.post('http://localhost:3000/api/student/conv', data);
        
        socket.emit("messageSent", {
            data,
            name,
            chatId
          });

        setMessages('');        // clear input field
        } catch (error) {
            console.error(error);
        }
    };

    const handleMessageChange = (event) => {
        setMessages(event.target.value);
    };

    const onInputKeyDown = (event) => {
        if (event.target.KEY === "enter") {
          sendMessage();
        }
      };
    
      // Create Chat
    
    
    const handleChatChange = (e) => {
        setChatData({ ...chatData, [e.target.name]: e.target.value });
    };
    
    const handleChatCreation = () => {
        let userID = '';
        if (userType === 'student') {
            userID = name.studentId;
        } else if (userType === 'staff') {
            userID = name.staffId;
        }

        const payload = {
            topic: chatData.topic,
            categoryId: chatData.categoryId,
            creatorType: userType,
            creatorId: userID,
            restrictedMode: chatData.restrictedMode,
        };
    
        axios.post('http://localhost:3000/api/student/chat', payload)
        .then((response) => {
            console.log('Chat created successfully:', response.data);
            setCreate(false);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error creating chat:', error);
        });
    };




    // conversation to Chat change 

    const [zIndex1, setZIndex1] = useState(1);
    const [zIndex2, setZIndex2] = useState(0);

    const handleClickDiv1 = () => {
        setZIndex2(2);
        setZIndex1(1);
    };

    const handleClickDiv2 = () => {
        setZIndex1(2);
        setZIndex2(1);
    };


// Check if user has preferences

    useEffect(() => {
        ip.get('/api/staff/getOpt', {
            params: {
                userType: userType,
                userId: userId,
            },
        })

        .then(res => {
            if (res.data.success === true) {
                setPrefer(true);
            }
        })
        .catch(err => console.log(err));
    }, [userId, userType]);

  // OPtion change Advanced or General

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);

        if (e.target.value === 'general') {
            setPassId('');
        } else if (e.target.value === 'advanced') {
            setPassId(userId);
        }
    };

    // Get Chat API

    useEffect(() => {
        ip.get('/api/student/getchat', {
            params: {
                userType: userType,
                userId: passId,
            },
        })
        
        .then(res => {
            setChats(res.data);
            // console.log(prefer);
        })
        .catch(err => console.log(err));
    }, [passId, userType]);


      // Get Conversation API

      useEffect(() => {
        getAllMessages();
      }, [chatId,activeChat]);
    
      function getAllMessages() {
        ip.get(`/api/student/getconv?chatId=${chatId}`)
          .then((res) => {
            setMessage(res.data.Results);
          })
          .catch((err) => console.log(err));
      }

    
    const handleChatBtn = (newChatId) => {      // Function to handle changing chatId
        setChatId(newChatId);
    };

  // Active Click Chat

    const handleChatClick = (chat) => {
        setActiveChat(chat);
        // setConversation(false);
        handleClickDiv1();

        socket.emit("activeChatClicked", {
            name,
            userId,
            userType,
          });
    }

    // Get Department

    useEffect(() => { 
        ip.get('/api/student/getDep')
        .then(response => setDepts(response.data))
        .catch(err => console.log(err));
    }, []);

    // delete chat topic

    const deleteChat = () => {
        const requestBody = {
            chatId: chatId,
            creatorId: userId,
            creatorType: userType,
        };

        ip.delete('/api/staff/deleteChat', { data: requestBody })
        .then(response => {
            console.log(response.data);
            setDeletePop(!deletePop);
            window.location.reload();
        })
        .catch(err => console.log(err));
    };


    // let user_img = '';
    // let user_image = messages.picture;

    // if (user_image === null || user_image === undefined) {
    //     user_img = user_avatar;
    // } else {
    //     user_img = user_image.replace('Images', '');
    //     user_img = `http://localhost:3000${user_img}`;
    // }



    return (
        <div className="user-home">
            
            <SideBar />


            {/* ======= Discussion Section ====== */}

            <div class="chat-box">
                <div class="row">

                    <section class="discussions" style={{ zIndex: zIndex1 }}>
                        <div class="top-bar">
                            {/* <div class="searchbar">
                                <IoSearch className='icon'/>
                                <input type="text" placeholder="Search..." className='input-me'></input>
                            </div> */}

                            {prefer && (

                            <div className='chat-option'>
                                <label>
                                    <input type="radio" value="general" checked={selectedOption === 'general'} onChange={handleOptionChange}/>
                                    <span>General</span>
                                </label>

                                <label>
                                    <input type="radio" value="advanced" checked={selectedOption === 'advanced'} onChange={handleOptionChange}/>
                                    <span>Advanced</span>
                                </label>
                            </div>

                            )}

                            <div class="options">
                                <FcAddDatabase className='icon' onClick={()=> setCreate(!create)}/>

                                {create && (
                                    <div className='add-chat' ref={dropdownRef}>
                                        <p>Create Chat</p>
                                        <input type="text" placeholder="Topic" name="topic" value={chatData.topic} onChange={handleChatChange} required/>
                                        
                                        <select name="restrictedMode" id="restrictedMode" value={chatData.restrictedMode} onChange={handleChatChange} required>
                                            <option hidden>Type</option>
                                            <option value="0">Open</option>
                                            <option value="1">Restricted</option>
                                        </select>

                                        <select name="categoryId" id="categoryId" value={chatData.categoryId} onChange={handleChatChange} required>
                                            <option hidden>Type</option>
                                            <option value="1">Open</option>
                                            {depts.map((Depart, i) => (
                                                <option key={i} value={Depart.categoryId}>{Depart.name}</option>
                                                )
                                            )}
                                        </select>
                                        <button onClick={handleChatCreation}>Create</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='scroll-discussions'>
                            
                        {chats.map((chat, index) => (
                        <div key={index}>

                            <div className={`discussion ${activeChat === chat.chatId ? 'message-active' : ''}`}
                                    onClick={(event) => {
                                        handleChatClick(chat.chatId);
                                        setActiveChatID(chat.chatId);
                                        handleChatBtn(chat.chatId);
                                        setTopic(chat.topic);
                                        setCreatorType(chat.creatorType);
                                        setCreatorId(chat.creatorId);
                                        event.stopPropagation(); // To prevent event bubbling
                                    }}
                                    >
                            
                                <div className="photo" style={{backgroundImage: 'url(https://i.pinimg.com/564x/0f/91/5a/0f915a0565ffb4470a78552eed75ac83.jpg)'}}></div>
                                <div className="desc-contact">
                                    <p className="name">{chat.topic}</p>
                                    <p className="message">Let's meet for a coffee CSS word-wrap property is used to break the long words.</p>
                                </div>
                                <div className="timer">{chat.for}</div>
                                
                            </div>

                        </div>
                        ))}


                        </div>
                        
                    </section>



            {/* ====== CHAT SECTION ======= */}


                {activeChat === activeChatID && activeChat !=='0' ? (
                <>
                    <section class="chat" style={{ zIndex: zIndex2 }}>
                        <div class="header-chat">
                            <RxChevronLeft className='icon'  onClick={handleClickDiv2}/>
                            <p class="name">{topic}</p>
                            <IoOptionsSharp  className='setting'onClick={()=> setSettingPop(!settingPop)}/>


                            {settingPop && (
                                <div className="setting-pop" ref={dropdownRef}>

                                {userType === 'student' && creatorType === 'student' && creatorId === name.studentId ? (
                                    <div className="line" onClick={()=>{setSettingPop(!settingPop); setDeletePop(!deletePop);}} >delete</div>
                                ) : userType === 'staff' && creatorType === 'staff' && creatorId === name.staffId ? (
                                    <div className="line" onClick={()=>{setSettingPop(!settingPop); setDeletePop(!deletePop);}} >delete</div>
                                ) : (
                                    null
                                )}


                                    <div className="line" onClick={()=> setSettingPop(!settingPop)}>Exit</div>
                                </div>
                            )}



                            {deletePop && (

                            <div className='delete' ref={dropdownRef}>
                                
                                <div className='icon'><IoWarningOutline className="image"/></div>
                                <p>Are you sure you want to delete this chat ?</p>
                                <button onClick={deleteChat}>Delete</button>
                            </div>

                            )}



                        </div>

                        
                        <div class="messages-chat" ref={chatContainerRef}> 

                        {message.map((messages, i) => (
                        <div key={i}>
                            {(() => {

                                let user_img = '';
                                let user_image = messages.picture;

                                if (user_image === null || user_image === undefined || !currentUser) {
                                user_img = user_avatar;
                                } else {
                                user_img = user_image.replace('Images', '');
                                user_img = `http://localhost:3000${user_img}`;
                                }

                                // if (user_image) {
                                //     user_img = user_image.replace('Images', '');
                                //     user_img = `http://localhost:3000${user_img}`;
                                // } else {
                                //     user_img = user_avatar;
                                // }

                            return (
                            <>

                            {messages.senderType === 'Student' && messages.userId === name.studentId ? (

                            <div class="message-container-right">
                                <div class="message text-only">
                                    <div class="response">
                                    <p class="text">{messages.message}</p>
                                    </div>
                                </div>
                                {/* <div class="response-time"> 15h04</div> */}
                            </div>

                            ) : messages.senderType === 'Staff' && messages.userId === name.staffId ? (

                            <div class="message-container-right">
                                <div class="message text-only">
                                    <div class="response">
                                    <p class="text">{messages.message}</p>
                                    </div>
                                </div>
                            </div>

                            ) : (

                            <div className="message-container">
                                <div className="message">
                                    {/* <div className="photo" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)'}}></div> */}
                                    <img className="photo" src={user_img} alt='Profile-img' />
                                    
                                    <div class="text">

                                    {messages.senderType === 'Staff' ? (
                                    <>
                                        <div className='name-text-red'>{messages.from} <VscVerified className='icon'/></div>
                                        <div className='focus-text'>{messages.message}</div>
                                    </>
                                    ) : (
                                    <>
                                        <div className='name-text-blue'>{messages.from}</div>
                                        <div className='focus-text'>{messages.message}</div>
                                    </>
                                    )}

                                    </div>
                                </div>
                                {/* <p class="time"> 15h09</p> */}
                            </div>

                            )}

                            </>
                            );})()}        

                        </div>
                        ))}

                        </div>


                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here" value={messages} onChange={handleMessageChange} onKeyDown={onInputKeyDown}/>
                            <button className='send_button' onClick={sendMessage}><IoSend className="icon"/></button>
                        </div>

                    </section>
                </>

                ) : (

                <>
                    <section class="chat">
                        <div class="header-chat">
                            <i class="icon fa fa-user-o" aria-hidden="true"></i>
                            <p class="name"> </p>
                            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                        </div>

                        <div class="messages-null"> 
                            <p class="null"> Select a chat to start messaging ... </p>
                        </div>

                        <div class="footer-chat">
                            <input type="text" className="write-message" placeholder="Type your message here"></input>
                            <button className='send_button'><IoSend className="icon"/></button>
                        </div>

                    </section>
                </>
                )}



                </div>
            </div>



        </div>
    );
}

export default Chat;
