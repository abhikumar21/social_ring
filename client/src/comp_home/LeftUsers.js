import React, { useState } from 'react'
// import Bot from '../img_home/bot.jpg'
import './LeftUsers.css'
import { useDispatch, useSelector } from 'react-redux'
import { followuser, unfollowuser } from '../action/userAction'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'

const LeftUsers = ({followUser}) => {

const {user} = useSelector((state)=>state.authReducer.authData)
const [followed, setFollowed] = useState(user.following.includes(followUser._id))
// const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
 const dispatch = useDispatch()
//  console.log(user)
// console.log(followUser._id, user)

 const handleFollow = () => {
  dispatch(followuser(followUser._id, user))
  followed ? setFollowed(false) : setFollowed(true)
 }

 const handleUnfollow = () => {
  dispatch(unfollowuser(followUser._id, user))
  followed ? setFollowed(false) : setFollowed(true)
 }

  return (
    <>
     <div className="followers relative rounded-lg">
        <div className='someuser my-2 py-3 px-4 '>
        <Avatar alt="Cindy Baker" src={followUser.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + followUser.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"}  />  
        {/* <div className='h-15 w-15 rounded-full overflow-hidden'><img src={followUser.profilePicture ? serverPublic + followUser.profilePicture : serverPublic + "defaultProfile.jpg"} className='h-full w-auto'></img></div> */}
        <Link to = {`/profile/${followUser._id}`} className='name text-black'>
           <h3 className='text-xl'>{followUser?.firstname + " " + followUser?.lastname}</h3>
           <h5 className='text-sm opacity-80 absolute'>{followUser.username}</h5>
         </Link>
         {followed ? <button onClick={handleUnfollow}>Unfollow</button> : <button onClick={handleFollow}>Follow</button>}
        
        </div> 
     </div>
    </>
  )
}

export default LeftUsers
