import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './Chatpage.css'
import { getUser } from '../../api/UserRequest'
import { Avatar } from '@mui/material'
import {Link} from 'react-router-dom'
import Bot from '../../img_home/bot.jpg'
import AddIcon from '@mui/icons-material/Add';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { getMessages, addMessage } from '../../api/MessageRequest.js'
import { format, render, cancel, register } from 'timeago.js'
import InputEmoji from "react-input-emoji";
import {io} from 'socket.io-client'


const ChatBox = ({chat, currentUserId}) => {
    // console.log(chat)
  const {user} = useSelector((state) => state.authReducer.authData);  
  const [userdata, setUserData] = useState(null)
  const [someUserData, setSomeUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [typed, setTyped] = useState("")

  const socket = useRef();
  const scroll = useRef();


  useEffect(()=> {
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add", user._id);
    socket.current.on('get-users', (users)=> {
      setOnlineUsers(users);
    })
  }, [user])

    //recieve message to the socket server
    useEffect(()=> {
      socket.current.on("recieve-message", (data)=> {
        setRecieveMessage(data);
      })
    }, [])

    useEffect(()=> {
      if(recieveMessage != null && recieveMessage.chatId === chat?.id) {
        setMessages([...messages, recieveMessage])
        // console.log("Data recieved", recieveMessage)
        // console.log(messages)
      }
    }, [recieveMessage])


  const handleChange = (typed) => {
    setTyped(typed)
    // console.log(typed)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const info = {
      chatId: chat._id,
      senderId: currentUserId,
      text: typed
    }
    try {
      const {data} = await addMessage(info);
      setMessages([...messages, data]);
      setTyped("");
    } catch (error) {
      console.log(error)
    }
      //send message to socket
    const recieverId = chat.members.find((id)=> id!==currentUserId);
    setSendMessage({...typed, recieverId})
  }

  useEffect(()=> {
    if(sendMessage != null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(()=> {
    const allMessages = async() => {
      // console.log(chat)
        try {
            const {data} = await getMessages(chat?._id)
            setMessages(data)
            // console.log(messages)
        } catch (error) {
            console.log(error)
        }
    }
    allMessages()
  }, [chat])


   useEffect(()=> {
    const userId = chat?.members?.find((hisId)=> hisId!==currentUserId)
    // console.log(userId)
    const getUserData = async() => {
      try {
        const {data} = await getUser(userId);
        setSomeUserData(data)
        // console.log(someUserData);
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [chat, currentUserId])

//scroll to last message
   useEffect(()=> {
    scroll.current?.scrollIntoView({ behaviour : "smooth" })
   }, [messages])


  return (
     
    <>
    {chat ? (
          <>
             <div className="chats-head flex">
    <Avatar alt="Cindy Baker" src={someUserData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + someUserData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.jpg'}  />  
     <Link className='name text-black ml-2 w-full'>
      <h3 className='text-md font-bold'>{someUserData?.firstname} {someUserData?.secondname}</h3>
      <h5 className='text-sm opacity-80 absolute'>Online</h5>
     </Link>
    </div>
    <hr className='my-2' />
    <div className="messages h-[85%] overflow-y-scroll relative">
      <div className='chatBox'>
        {messages.map((message)=> {
            return (
                <div className='' ref={scroll}>
                 <div className={message.senderId === currentUserId ?   "rMessage" : "sMessage"}>
                   <div className={message.senderId === currentUserId ? "reciever" : "sender"}>
                     <span className='text-message h-auto py-3'>{message.text}</span>
                     <span className='time text-sm ml-8 w-[100px] flex justify-end items-end text-[0.7rem]'>{format(message.createdAt)}</span>
                   </div>
                  </div>
                </div>
            )
        })}
      
    </div>
    </div>
    <form className="type-message relative w-full bg-slate-300 h-[40px] flex items-center rounded-md">
      <AddIcon className='mx-2'/>

      <InputEmoji 
      name='typed' 
      type="text" 
      className='w-[85%] h-[30px] rounded-lg my-4' 
      value={typed}
      onChange={handleChange} 
      />

      <button type="submit" className='mx-8' onClick={handleSubmit}>Send</button>
    </form>
    </>
    
    ) : (
      <div>Welcome to chatting page</div>
      )}
      </>
      
    
  )
}

export default ChatBox
