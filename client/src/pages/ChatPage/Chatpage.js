import React, { useEffect, useRef, useState } from 'react'
import './Chatpage.css'
import Messenger from './Messenger.js'
import { Avatar } from '@mui/material'
import {Link} from 'react-router-dom'
import Bot from '../../img_home/bot.jpg'
import AddIcon from '@mui/icons-material/Add';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest.js'
import ChatBox from './ChatBox.js'
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'


const Chatpage = () => {

  const {user} = useSelector((state) => state.authReducer.authData)
  // console.log(user)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [message, setMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()
  const [isActive, setIsActive] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io('http://localhost:8800')
  
    // Log connection success
    socket.current.on('connect', () => {
      console.log('Socket connected:', socket.current.id); // Log the socket ID to ensure connection
    });
  
    // Emit event for new user connection
    socket.current.emit("new-user-add", user._id);
  
    // Listen for 'get-users' to update the online users list
    socket.current.on('get-users', (users) => {
      console.log('Online users:', users); // Log the online users
      setOnlineUsers(users);
    });
  
    // Clean up socket connection on component unmount
    return () => {
      socket.current.disconnect();
      console.log('Socket disconnected');
    }
  }, [user]);
  

  // useEffect(()=> {
  //   socket.current = io('http://localhost:8800')
  //   socket.current.emit("new-user-add", user._id)
  //   socket.current.on('get-users', (users) => {
  //     setOnlineUsers(users);
  //   })
  // }, [user])

  useEffect(() => {
    const getChats = async() => {
      try{
        const {data} = await userChats(user._id)
        setChats(data)
        const chat = data.find(chat=>chat.members.includes(user._id) && chat.members.includes(id));
        setIsActive(chat._id);
      }
      catch (error) {
        console.log(error)
      }
    }
    getChats();
  }, [user])


  // useEffect(()=> {
  //   const allMessages = async() => {
  //     try {
  //       const message = await getMessages(chatId)
  //       console.log(currentChat)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   allMessages()
  // })

  // useEffect(()=> {
  //   console.log(currentChat)
  // }, [currentChat])

  const handleClick = (chat) => {
    setIsActive(chat._id);
    setCurrentChat(chat);
    // console.log(chat._id)
    // console.log(currentChat)
  }

  return (
    <div className='chatpage'>
      <div className="people">
        <h1 className='text-2xl'>Messages</h1>
        <div className="my-contacts">
          {
          chats.map((chat) => {
            return (
              // Messenger = Conversation 
              <div key={chat._id} onClick = {()=> handleClick(chat)} className={`relative rounded-lg ${isActive===chat._id ? 'bg-black text-white' : 'bg-slate-300 text-green-300' }`}>
               <Messenger chat={chat} currentUserId={user._id} changeColor={isActive===chat._id}/>
              </div>
            )
          }
          )}
        </div>
      </div>

      
      <div className="chats relative">
        <ChatBox chat={currentChat} currentUserId={user._id} />
      </div>
      
    </div>
  )
}

export default Chatpage
