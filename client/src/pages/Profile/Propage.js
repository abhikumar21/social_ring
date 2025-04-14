import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Rightbar from '../../comp_home/Rightbar';
import './Propage.css'
import {Link, useParams} from 'react-router-dom';
// import Posts from '../../comp_home/Posts';
// import Bot from '../../img_home/bot.jpg';
// import { followuser } from '../../api/UserRequest';
import Modal_edit from './Modal_edit';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import * as UserApi from '../../api/UserRequest';
import { logout } from '../../action/AuthAction';
import { followuser, unfollowuser } from '../../action/userAction';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { createChat, findChat } from '../../api/ChatRequest';



const ProPage = () => {

  const {user} = useSelector((state)=> state.authReducer.authData)
  const posts = useSelector((state)=> state.postReducer.posts)
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(posts)
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const allposts = posts.filter((post) => post.userId === profileUserId)
  const [profileUser, setProfileUser] = useState(false);
  const [show, setShow] = useState(false);
  const [followed, setFollowed] = useState(user.following.includes(profileUserId))


  const handleFollow = () => {
    dispatch(followuser(profileUserId, user))
    followed ? setFollowed(false) : setFollowed(true)
   }
  
   const handleUnfollow = () => {
    dispatch(unfollowuser(profileUserId, user))
    followed ? setFollowed(false) : setFollowed(true)
   }

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleCreateChat = async() => {
    try {
      const {data} = await findChat(user._id, profileUserId);
      if(!data) {
        try {
          createChat(user._id, profileUserId);
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    const fetchProfileUser = async() => {
      if(profileUserId === user._id) {
        setProfileUser(user)
        // console.log(profileUser)
      }
      else{
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data)
        // console.log(profileUser)
      }
    }
    fetchProfileUser();
  },[user])

  // useEffect(() => {
  //   console.log(profileUser);
  // }, [profileUser]);


  return (
    <>
     <div className="profile_page">
      <div className='profile_info'>  
        
        <div className="pr_dp flex align-middle justify-center items-center" >
         <div className="pro-image w-[150px] h-[150px] rounded-full flex justify-center items-center overflow-hidden">
          <img className="pr_dpro relaive w-full h-full object-cover" onClick={()=>setShow(!show)} src={profileUser.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + profileUser.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"}></img>
         </div>
        </div>


        <div className="pr_info py-2">

          <div className='pr1_info flexed mt-4 mb-12'>
            <Link to="../home">
            <button className="pr_info1 text-[25px]">{profileUser.username}</button>
            </Link>
            {profileUserId!==user._id ? <>
                        {followed ? 
                        <button className="pr_info2 bg-blue-700" onClick={handleUnfollow} >Unfollow</button> : 
                        <button className="pr_info2 bg-blue-700" onClick={handleFollow} >Follow</button>}
                        
                        <Link to={`/chat`} onClick={handleCreateChat} className='pr_info2 bg-white text-black'>Message</Link>
                        </>
                        : ""
            }

            <Modal_edit profileUserId={profileUserId} data={user} show={show} />
            <button className='pr_info2 pr_logout bg-red-600' onClick={handleLogout} >Log out</button>
 
          </div>
  
           <div className="pr2_info flexed text-[18px] mb-5">
            <p>
              {posts.filter((post)=> post.userId === profileUserId).length } posts</p>
            <a>{profileUser ? profileUser.followers.length : 0} followers</a>
            <a>{profileUser ? profileUser.following.length : 0} following</a>
           </div>

           <div className="pr3_info w-[600px]">
            <h4 className='text-xl mb-2'>{profileUser.firstname}</h4>
            <h5 className='mb-1 italic'>{profileUser.worksAt}</h5>
            <p>{profileUser.about}</p>
           </div>

        </div>
     
      </div>

      <div className="pr_posts mt-28">
       <ResponsiveMasonry 
        columnsCountBreakPoints={{350: 1, 550: 2, 900: 3, 1100: 4}}>
        <Masonry>
        {
         allposts.map((post, id) => {
          return <div className="pr_post1 z-10"><img className='' src={ post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""} /></div>
         })
         
        }
        </Masonry>
       </ResponsiveMasonry>
      </div>
      
     </div>

     {/* <Rightbar/> */}
    </>
  )
}

export default ProPage
