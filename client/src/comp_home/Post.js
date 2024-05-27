import React, { useState } from 'react'
// import Bot from '../img_home/bot.jpg'
import Like from '../img_home/likeline.png'
import Likedit from '../img_home/heartcolor.png'
import Bookmark from '../img_home/bookmarkline.png'
import Share from '../img_home/share.png'
import { useSelector } from 'react-redux'
import { likePost } from '../api/PostRequest'
// import { getAllUsers } from '../api/UserRequest'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '@headlessui/react'
//add like in postcontroller


const Post = ({data, Userdata}) => {
  // console.log(data)
  const {user} = useSelector((state)=> state.authReducer.authData)
  const [liked, setliked] = useState(data.likes.includes(user._id));
  const [likes, setlikes] = useState(data.likes.length);
  

 const handleLike = () => {
  setliked((prev)=> !prev)
  likePost(data._id, user._id)
  liked ? setlikes((prev) => prev-1) : setlikes((prev) => prev+1)
 }



 

  return (

    <div className='post px-2 py-4 mb-10 bg-orange-300 rounded-lg'>

        <div className='username'>
            <h6 className='text-lg'>{Userdata?.firstname}</h6>
        </div>

        <div>
          <img className='rounded-lg' src={ data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : "" } alt="image"></img>
        </div>

        <div className=''>
         <div className='h-14 flex relative flex-row pt-2 align-middle' >
            <img className='h-1/2 mx-2' src={liked ? Likedit:Like} style ={{cursor:"pointer"}} onClick={handleLike}></img>
            <img className='h-1/2 mx-2' src={Share}></img>
            <img className='h-1/2 mx-2' src={Bookmark}></img>

            <Menu>
      <Menu.Button>
      <MoreVertIcon className='flex absolute right-1' />
      </Menu.Button>
      <Menu.Items className="bg-white absolute flex flex-col px-2 py-2 rounded-md right-6 top-8">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'} px-1 py-1`}
              href="/account-settings"
            >
              Edit Post
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'} px-1 py-1`}
              href="/account-settings"
            >
              Delete Post
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>

         </div>


         <span className='ml-2'>{likes} likes</span>
         <div className='caption ml-2'>
            <span><strong>{Userdata?.firstname} : </strong>{data.desc}</span>
         </div>
        </div>

    </div>

  )
}

export default Post
