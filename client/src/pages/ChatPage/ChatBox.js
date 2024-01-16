import React, { useEffect, useState } from 'react'
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


const ChatBox = ({chat, currentUserId}) => {
    console.log(chat)
   const [userdata, setUserData] = useState(null)
  const [someUserData, setSomeUserData] = useState(null)
  const [messages, setMessages] = useState([])

  const [typed, setTyped] = useState("")
  const handleChange = (typed) => {
    setTyped(typed)
  }

  const handleSubmit = async() => {
    const info = {
      chatId: chat._id,
      senderId: currentUserId
    }
    try {
      // const postMessage = await addMessage()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    const allMessages = async() => {
        try {
            const {data} = await getMessages(chat._id)
            setMessages(data)
            // console.log(messages)
        } catch (error) {
            console.log(error)
        }
    }
    allMessages()
  }, [chat])


   useEffect(()=> {
    const userId = chat?.members?.find((id)=> id!==currentUserId)
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
    <div className="messages h-[85%] overflow-y-scroll">
      <div className='chatBox'>
        {messages.map((message)=> {
            return (
                <>
                 <div className={message.senderId === currentUserId ?   "rMessage" : "sMessage"}>
                   <div className={message.senderId === currentUserId ? "reciever" : "sender"}>
                     <span className='text-message h-auto py-3'>{message.text}</span>
                     <span className='time text-sm ml-8 w-[100px] flex justify-end items-end text-[0.7rem]'>{format(message.createdAt)}</span>
                   </div>
                  </div>
                </>
            )
        })}
      
    </div>
    </div>
    <div className="type-message relative w-full bg-slate-300 h-[40px] flex items-center rounded-md">
      <AddIcon className='mx-2'/>

      <InputEmoji 
      name='typed' 
      type="text" 
      className='w-[85%] h-[30px] rounded-lg my-4' 
      value={typed} 
      onChange={handleChange} 
      />

      <button className='mx-8' onClick={handleSubmit}>Send</button>
    </div>
    </>
    
    ) : (
      <div>Welcome to chatting page</div>
      )}
      </>
      
    
  )
}

export default ChatBox
