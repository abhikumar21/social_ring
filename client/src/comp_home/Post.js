import React, { useState } from 'react'
import './Post.css'
import Bot from '../img_home/bot.jpg'
import Like from '../img_home/likeline.png'
import Likedit from '../img_home/heartcolor.png'
import Bookmark from '../img_home/bookmarkline.png'
import Share from '../img_home/share.png'
import { useSelector } from 'react-redux'
import { likePost } from '../api/PostRequest'

//add like in postcontroller


const Post = ({data}) => {

  const {user} = useSelector((state)=> state.authReducer.authData)
  const [liked, setliked] = useState(data.likes.includes(user._id));
  const [likes, setlikes] = useState(data.likes.length);
 const handleLike = () => {
  setliked((prev)=> !prev)
  likePost(data._id, user._id)
  liked ? setlikes((prev) => prev-1) : setlikes((prev) => prev+1)
 }

  return (

      <div className='post px-2 py-4 mb-10 bg-orange-300 rounded-lg relative'>
        <div className='username'>
            <h6>{data.name}</h6>
        </div>
        <div>
          <img className='rounded-lg' src={ data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : "" }></img>
        </div>
        <div className=''>
        <div className='h-14 flex flex-row pt-2 align-middle' >
            <img className='h-1/2 mx-2' src={liked ? Likedit:Like} style ={{cursor:"pointer"}} onClick={handleLike}></img>
            <img className='h-1/2 mx-2' src={Share}></img>
            <img className='h-1/2 mx-2' src={Bookmark}></img>
        </div>
        <span className='ml-2'>{likes} likes</span>
        <div className='caption ml-2'>
            <span><strong>{data.name} Abhishek Kumar : </strong>{data.desc}</span>
        </div>

        </div>



        </div>

  )
}

export default Post
