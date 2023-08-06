import "./Leftbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faDragon} from '@fortawesome/free-solid-svg-icons'
// import Bot from '../img_home/bot.jpg'
// import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import LeftUsers from "./LeftUsers.js"
import { getAllUsers } from "../api/UserRequest"




const Leftbar = () => {

   const {user} = useSelector((state)=> state.authReducer.authData)
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
   const ProfilePage = false;
   const [followUsers, setFollowUsers] = useState([])

   useEffect(()=> {
    const fetchUsers = async() => {
      const {data} = await getAllUsers();
      setFollowUsers(data)
      // console.log(data)
    }
   fetchUsers()
   }, [])


  return (
    <div className='sidebar flex flex-col z-50'>

      <span className="searchbar rounded-lg">
         <FontAwesomeIcon icon={faDragon} className="sbx"/>
         <input className='sbx w-full rounded-xl ml-2 h-10 px-5 mr-5' placeholder='search'></input>
         <FontAwesomeIcon icon={faMagnifyingGlass} className="sbx mr-3"/>
         </span>

     <div className='cardbg h-96 w-full mt-12'>
      <div className='relative h-1/2 bg-transparent text-black flex justify-center align-middle'>
        <img className="dpro absolute h-32 w-32 mt-10 rounded-full" src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"} alt="image"></img>
        <h2 className="relative font-bold text-2xl">{user.firstname}</h2>
      </div>

      <div className="info">
      <hr className="hr1 mb-5"/>
      <div className='grid1 text-black'>
        <div className="f1"><p><strong></strong>{user.followers.length}<p/>Followers</p></div>
        <div className="vl bg-slate-500 w-1"></div>
        <div className="f1"><p><strong>{user.following.length}</strong><p/>Following</p></div>
      </div>
      <hr className="hr2 mt-5"/>


      {ProfilePage ? ""
        :
<span className="flex align-middle justify-center mt-5 font-bold">
   <button className="profilebtn text-violet-800 text-2xl">
     <Link to = {`/profile/${user._id}`} >
       My Profile
     </Link>
   </button>
  </span>
      }
       
      </div>

     </div>

     <h3 className="mt-5">People You may follow</h3>

      <div className='left_users'>
          { followUsers.map((followUser)=> {
            if(user._id !== followUser._id) {
              return <LeftUsers key={followUser._id} followUser={followUser} />
            }
          })}
        
      </div>

      
     
    </div>
  )
}

export default Leftbar
