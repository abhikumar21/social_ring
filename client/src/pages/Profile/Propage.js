import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rightbar from '../../comp_home/Rightbar';
import './Propage.css'
import {Link, useParams} from 'react-router-dom';
import Posts from '../../comp_home/Posts';
import Bot from '../../img_home/bot.jpg';
import { followuser } from '../../api/UserRequest';
import Modal_edit from './Modal_edit';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as UserApi from '../../api/UserRequest';
import { logout } from '../../action/AuthAction';



const ProPage = () => {

  const {user} = useSelector((state)=> state.authReducer.authData)
  const posts = useSelector((state)=> state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const allposts = posts.filter((post) => post.userId == profileUserId)
  const [profileUser, setProfileUser] = useState(false);
  const [show, setShow] = useState(false);

  const handleFollow = () => {
    
  }

  const handleLogout = () => {
    dispatch(logout());
  }


  useEffect(()=> {
    const fetchProfileUser = async() => {
      if(profileUserId === user._id) {
        setProfileUser(user)
        console.log(profileUser)
      }
      else{
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data)
        console.log(profileUser)
      }
    }
    fetchProfileUser();
  },[user])

  useEffect(() => {
    console.log(profileUser);
  }, [profileUser]);


  return (
    <>
     <div className="profile_page bg-gray-700">
      <div className='profile_info'>
        <div className="pr_dp flex align-middle justify-center" >
         
          <img className="pr_dpro relaive h-32 w-32 mt-10 rounded-full" onClick={()=>setShow(!show)} src={profileUser.profilePicture ? serverPublic + profileUser.profilePicture : serverPublic + "defaultProfile.jpg"}></img>

        </div>


        <div className="pr_info py-2">

          <div className='pr1_info flexed my-4'>
            <Link to="../home">
            <button className="pr_info1">{profileUser.username}</button>
            </Link>
            {profileUserId===user._id ? <>
                        <button className="pr_info2 bg-blue-700" onClick={handleFollow} >Follow</button>
                        <button className='pr_info2 bg-white text-black'>Message</button>
                        </>
                        : ""
          }

            <Modal_edit profileUserId={profileUserId} data={user} show={show} />
            <button className='pr_info2 pr_logout bg-red-600' onClick={handleLogout} >Log out</button>
 
          </div>
  
           <div className="pr2_info flexed">
            <p>
              {posts.filter((post)=> post.userId == profileUserId).length } posts</p>
            <a>{profileUser ? profileUser.followers.length : 0} followers</a>
            <a>{profileUser ? profileUser.following.length : 0} following</a>
           </div>

           <div className="pr3_info">
            <h4>{profileUser.firstname}</h4>
            <h5>{profileUser.worksAt}</h5>
            <p>{profileUser.about}</p>
           </div>

        </div>
     
      </div>

      <div className="pr_posts mt-28">
        {
         allposts.map((post, id) => {
          return <div className="pr_post1"><img src={ post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""} /></div>
         })
         
        }
      </div>
      
     </div>

     <Rightbar/>
    </>
  )
}

export default ProPage
