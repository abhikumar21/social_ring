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


const Chatpage = () => {

  const {user} = useSelector((state) => state.authReducer.authData)
  // console.log(user)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [message, setMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()

  useEffect(()=> {
    socket.current = io('http://localhost:8800')
    socket.current.emit("new-user-add", user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    })
  }, [user])

  useEffect(() => {
    const getChats = async() => {
      try{
        const {data} = await userChats(user._id)
        setChats(data)
        // console.log(data)
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
    setCurrentChat(chat);
    // console.log(chat)
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
              <div onClick = {()=> handleClick(chat)} className="relative rounded-lg bg-slate-400">
               <Messenger chat={chat} currentUserId={user._id} />
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
