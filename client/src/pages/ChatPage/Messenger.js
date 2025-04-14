import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import Bot from '../../img_home/bot.jpg'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/UserRequest.js'


const Messenger = ({chat, currentUserId, changeColor}) => {

  const [someUserData, setSomeUserData] = useState(null)

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

  // const {user} = useSelector((state)=>state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


  return (
    <>
      <div className='someuser my-2 py-3 px-2'>
        <Avatar alt="Cindy Baker" src={someUserData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + someUserData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.jpg'}  />  
         <div className={`name ml-2 w-full ${!changeColor?'text-black':'text-white'}`}>
          <h3 className='text-md font-bold'>{someUserData?.firstname} {someUserData?.lastname}</h3>
          <h5 className='text-sm opacity-80 absolute'>Online</h5>
         </div>
        </div> 
     
    </>
  )
}

export default Messenger
