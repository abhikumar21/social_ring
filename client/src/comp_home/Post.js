import React from 'react'
import Bot from '../img_home/bot.jpg'
import Like from '../img_home/likeline.png'
import Likeco from '../img_home/heartcolor.png'
import Bookmark from '../img_home/bookmarkline.png'
import Share from '../img_home/share.png'


const Post = ({data}) => {
  return (

      <div className='post my-10'>
        <div className='username'>
            <h6>{data.name}</h6>
        </div>
        <div>
          <img src={data.img}></img>
        </div>
        <div className=' bg-blue-200'>
        <div className='h-14 flex flex-row' >
            <img className='h-1/2' src={data.liked==true?Like:Likeco}></img>
            <img className='h-1/2' src={Share}></img>
            <img className='h-1/2' src={Bookmark}></img>
        </div>
        <span>{data.likes}</span>
        <div className='caption'>
            <span><strong>{data.name} : </strong>{data.caption}</span>
        </div>

        </div>



        </div>

  )
}

export default Post
