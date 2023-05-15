import React, {useState, useRef, useEffect} from 'react'
import Bot from '../img_home/bot.jpg'
import './Posts.css'
import Avatar from '@mui/material/Avatar'
import Post from './Post.js'
import { Dialog } from '@headlessui/react'
import P1 from '../img_home/p1.jpg'
import P2 from '../img_home/p2.jpg'
import P3 from '../img_home/p3.jpg'
import {useSelector, useDispatch} from 'react-redux'
import { uploadImage } from '../action/uploadAction';
import { uploadPost } from '../action/uploadAction';
import { getTimelinePosts } from '../action/postAction.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faVideo, faLocationDot} from '@fortawesome/free-solid-svg-icons'



const Posts = () => {
  const loadingnew = useSelector((state) => state.postReducer.uploading)
  const [image, setImage] = useState(null)
  const imageRef = useRef();
  const desc = useRef()
  const {user} = useSelector((state)=>state.authReducer.authData)
  const {posts, loading} = useSelector((state)=> state.postReducer)
  //change to posts

  const dispatch = useDispatch()
  let [isOpen, setIsOpen] = useState(true)

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
      const filename = Date.now() + image.name
      data.append("name", filename)
      data.append("file", image)
      newPost.image = filename;
      console.log(newPost)

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
         <Avatar alt="Cindy Baker" src={Bot}  />
         <input ref={desc} placeholder='caption' className='caption ml-6 w-full rounded-lg px-5'></input>
        </div>

        <div className='uploadbtn '>
          <button className='btn'
          onClick={()=>imageRef.current.click()}
          ><FontAwesomeIcon icon={faImage} />
            photo
          </button>

          <button className='btn'><FontAwesomeIcon icon={faVideo} />video</button>
          <button className='btn'><FontAwesomeIcon icon={faLocationDot} />location</button>
          <button className='btn'>schedule</button>

          <button className='btn postbtn bg-blue-600'>Post</button>

          <div style={{display:"none"}}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}></input>
          </div>
          
        </div>

        {/* {image && (
          <div className="previewimage">
          </div>
        )} */}

         {/* {image ? (
            <div className="previewimage">
             </div>
          ) : null
          } */}

         {/* {image ? (
            <div className="previewimage px-10 py-10 bg-white">
              <button className='bg-red text-black' onClick={()=>setImage(null)}>Close</button>
              <img src={image.image} alt="img"/>
             </div>
          ) : (
            <div></div>
          )} */}
   
       
      </div>


{/* post /////////////////// */}
    <div className='posts mt-10 w-full text-black h-full overflow-hidden overflow-y-scroll'>

      {image ? (
       <div className='post '>
        <div className='flex justify-around'>
          <button className='' onClick={handleSubmit} disabled= {loadingnew}> {loadingnew? "Uploading..." : "Post"} </button> 
          <button className='' onClick={()=> setImage(null)}>Delete</button>  
        </div>
        <div className='username'>
            <h6>hello</h6>
        </div>
          <div>
          <img src={URL.createObjectURL(image)}></img>
          </div>
          <div className=' bg-blue-200'>
          <div className='h-14 flex flex-row' >
            {/* <img className='h-1/2' src={data.liked==true?Like:Likeco}></img>
            <img className='h-1/2' src={Share}></img>
            <img className='h-1/2' src={Bookmark}></img> */}
          </div>
          <span>3683</span>
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
            return <Post data={post} id={id} />
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
