import React, {useState, useRef} from 'react'
import Bot from '../img_home/bot.jpg'
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Post from './Post.js'
import { Dialog } from '@headlessui/react'
// import { Postdata } from './Postdata';
import P1 from '../img_home/p1.jpg'
import P2 from '../img_home/p2.jpg'
import P3 from '../img_home/p3.jpg'


//1:16



const Posts = () => {

  const [image, setImage] = useState(null)
  const imageRef = useRef();

  let [isOpen, setIsOpen] = useState(true)

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]) {
      let img= event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      })
    }
    
  }

  const Postdata = [
    {
      img: P1,
      name: 'Abhishek',
      caption: "Hello this is my first post",
      likes: 4322,
      liked: true
  },

  {
      img: P2,
      name: 'Sachin',
      caption: "Hello this is my second post",
      likes: 4390,
      liked: false
  },

  {
      img: P3,
      name: 'Shashank',
      caption: "Hey, there I am using socially",
      likes: 40,
      liked: true
  }
  ]


  return (
    <div className='h-full pl-10 pr-10'>
      <div className='upload px-5 py-5 '>
        <div className='image flex mb-10'>
         <Avatar alt="Cindy Baker" src={Bot}  />
         <input placeholder='caption' className='ml-6 w-full'></input>
        </div>

        <div className='uploadbtn '>
          <button className='btn'
          onClick={()=>imageRef.current.click()}
          >
            photo
          </button>

          <button className='btn'>video</button>
          <button className='btn'>location</button>
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
    <div className='post bg-white mt-10 w-full h-auto text-black overflow-hidden overflow-y-scroll'>

      {image ? (
       <div className='post my-10'>
        <div className='flex justify-around'>
          <button className=''>Post</button> 
          <button className='' onClick={()=> setImage(null)}>Delete</button>  
        </div>
        <div className='username'>
            <h6>hello</h6>
        </div>
          <div>
          <img src={image.image}></img>
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
          <div></div>
          )
          }

        {
          Postdata.map((post, id) => {
            return <Post data={post} id={id} />
          })
        }
      </div>

    </div>
  )
}

export default Posts
