import "./Leftbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faDragon} from '@fortawesome/free-solid-svg-icons'
import Bot from '../img_home/bot.jpg'
import { Button } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { useState, useRef, useEffect} from "react"
import { uploadProfileImg } from "../action/uploadAction"
import { getTimelinePosts } from "../action/postAction"





const Leftbar = () => {

  //  const {user} = useSelector((state)=> state.authReducer.authData)
   const [profile, setProfile] = useState(null)
   const profileRef = useRef();
  //  const dispatch = useDispatch();

  //  const handleSubmit = (event) => {
  //   // event.preventDefault();
  //   const newPost = {
  //     userId: user._id
  //   }
  //   if(profile) {
  //     const data = new FormData();
  //     const filename = Date.now() + profile.name
  //     data.append("name", filename)
  //     data.append("file", profile)
  //     newPost.name= filename;
  //     console.log(newPost)

  //     try {
  //       dispatch(uploadProfileImg(data))
  //     } catch (error) {
  //       console.log(error)
  //     }

  //   }
  //  }

   const onProfileChange = (e) => {

    if(e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setProfile(img)
  //     handleSubmit();
    }

   }

  //  useEffect (() => {
  //   dispatch(getTimelinePosts(user._id))
  //  })

  return (
    <div className='sidebar flex flex-col z-50'>

      <span className="searchbar rounded-lg">
         <FontAwesomeIcon icon={faDragon} className="sbx"/>
         <input className='sbx w-full rounded-xl ml-2 h-10 px-5 mr-5' placeholder='search'></input>
         <FontAwesomeIcon icon={faMagnifyingGlass} className="sbx mr-3"/>
         </span>

     <div className='cardbg h-96 w-full mt-12'>
      <button className='h-1/2 w-full bg-transparent text-black flex justify-center align-middle'>
        {profile ? (
          <>
          <img className="dpro relative h-32 w-32 mt-10 rounded-full" src={URL.createObjectURL(profile)} ></img>
          <div className="relative top-48 flex">
          <button className="px-4">Ok</button>
          <button className="px-4" onClick={()=>setProfile(null)}>Delete</button>
          </div>
          </>
        ):(
        <img className="dpro relative h-32 w-32 mt-10 flex align-middle justify-center rounded-full" src={Bot} 
        onClick={()=>profileRef.current.click()}
         ></img>
        )}
       <div style={{display: "none"}} >
         <input type="file" name="profileImg" ref={profileRef} onChange={onProfileChange}></input>
       </div>

        <h2 className="relative font-bold text-2xl">Abhishek Kumar</h2>
      </button>

      <div className="info h-1/2">
      <hr className="hr1 mb-5"/>
      <div className='grid1 text-black'>
        <div className="f1"><p><strong>3435</strong><p/>Followers</p></div>
        <div className="vl bg-slate-500 w-1"></div>
        <div className="f1"><p><strong>3435</strong><p/>Following</p></div>
      </div>
      <hr className="hr2 mt-5"/>

       <span className="flex align-middle justify-center mt-5 font-bold"><button className="profilebtn text-violet-800 text-2xl">My Profile</button></span>
      </div>
      
   


     </div>

      
     
    </div>
  )
}

export default Leftbar
