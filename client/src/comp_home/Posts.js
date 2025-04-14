import React, {useState, useRef, useEffect} from 'react'
// import Bot from '../img_home/bot.jpg'
import './Posts.css'
import Avatar from '@mui/material/Avatar'
import Post from './Post.js'
import {useSelector, useDispatch} from 'react-redux'
import { uploadImage } from '../action/uploadAction';
import { uploadPost } from '../action/uploadAction';
import { getTimelinePosts } from '../action/postAction.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faVideo, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import Like from '../img_home/likeline.png'
// import Likedit from '../img_home/heartcolor.png'
import Bookmark from '../img_home/bookmarkline.png'
import Share from '../img_home/share.png'
import { getAllUsers } from '../api/UserRequest'
import ModalGen from '../pages/Profile/ModalGen'


const Posts = () => {
  const loadingnew = useSelector((state) => state.postReducer.uploading)
  const [image, setImage] = useState(null)
  const imageRef = useRef();
  const desc = useRef()
  const {user} = useSelector((state)=>state.authReducer.authData)
  const {posts} = useSelector((state)=> state.postReducer)
  // console.log(posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [postusers, setPostusers] = useState([])
  //change to posts

  useEffect(()=> {
    const fetchUsers = async() => {
      const {data} = await getAllUsers();
      setPostusers(data)
    }
    fetchUsers();
   },[])
  //  console.log(postusers)


  const dispatch = useDispatch()
  // let [isOpen, setIsOpen] = useState(true)

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]) {
      let img= event.target.files[0];
      setImage(img)
    }
    
  }

  
  const reset = () => {
    setImage(null)
    desc.current.value = ""
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }
    if(image) {
      const data = new FormData();
      const imgName = image.name
      let i= 0;
      let l= imgName.length;
      while(1) {
        if(i>=l) {
          break;
        }
        if(imgName[i]==='.')  {
          var del_str = imgName.substring(i, l);
            var newImg = imgName.replace(del_str, "");
            break;
        }
        i++;
      }
      // console.log(newImg)
      const f_name = newImg + Date.now()
      const filename = f_name.concat(del_str);
      // console.log(filename)

      data.append("name", filename)
      data.append("file", image)
      newPost.image = filename;
  //  console.log(data)
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
     dispatch(uploadPost(newPost))
     reset()
  }



  useEffect (() => {
    dispatch(getTimelinePosts(user._id))
  }, [])




  return (
    <div className='middlebar h-full pl-10 pr-10 z-50'>
      <div className='upload px-5 py-5 rounded-lg'>
        <div className='image flex mb-10'>
         <Avatar alt="Cindy Baker" src={ user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"}  />
         <input ref={desc} placeholder='caption' className='caption ml-6 w-full rounded-lg px-5'></input>
        </div>

        <div className='post_upload_btn'>
          <button className='btn'
          onClick={()=>imageRef.current.click()}
          ><FontAwesomeIcon icon={faImage} /> photo
          </button>

          <button className='btn'><FontAwesomeIcon icon={faVideo} /> video</button>
          <button className='btn'><FontAwesomeIcon icon={faLocationDot} /> location</button>
          {/* <button className='btn'>schedule</button> */}
          <ModalGen/>

          <button className='btn postbtn'>Post</button>

          <div style={{display:"none"}}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}></input>
          </div>
          
        </div>
   
      </div>


{/* post /////////////////// */}
    <div className='posts mt-10 w-full text-black'>

      {image ? 
       (
       <div className='post px-2 py-4 mb-10 bg-orange-200 rounded-lg'>
        <div className='flex justify-around'>
          <button className='text-blue-800 hover:bg-gray-400 px-5 py-1 mb-4 rounded-md' onClick={handleSubmit} disabled= {loadingnew}> {loadingnew? "Uploading..." : "Post"} </button> 
          <button className='text-red-700 hover:bg-gray-400 px-5 py-1 mb-4 rounded-md' onClick={()=> setImage(null)}>Delete</button>  
        </div>
       
         <div>
          <img className="rounded-lg" src={URL.createObjectURL(image)}></img>
         </div>
         <div className=''>
          <div className='h-14 flex flex-row pt-2 align-middle' >
            <img className='h-1/2 mx-2' src={Like}></img>
            <img className='h-1/2 mx-2' src={Share}></img>
            <img className='h-1/2 mx-2' src={Bookmark}></img>
          </div>
          <span>Likes</span>
          <div className='caption'>
            <span><strong>Username : </strong>Caption</span>
          </div>

         </div>
        </div>
          ) : (
          <></>
       )
      }
          
      {posts ? (
        
          posts.map((post, id) => {
            
            const Userdata = postusers.find((user)=> user._id === post.userId);
            return <Post key={id} data={post} id={id} Userdata={Userdata} />
          })
        
      ) : (
        <></>
      )
}

      </div>

    </div>
  )
}

export default Posts
