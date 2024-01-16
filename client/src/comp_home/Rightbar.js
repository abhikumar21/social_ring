import React from 'react'
import './Rightbar.css'
import ExploreIcon from '@mui/icons-material/Explore';
import MessageIcon from '@mui/icons-material/Message';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


const Rightbar = () => {
  return (
    <div className='rightbar'>
      <div className="right_buttons flex flex-row justify-around py-2">
        <button className='flex flex-col'><ExploreIcon/><h1>Explore</h1></button>
        <Link to={`/chat`} className='flex flex-col'><MessageIcon/><h1>Messsages</h1></Link>
        <button className='flex flex-col'><BookmarksIcon/><h1>Saved</h1></button>
        <button className='flex flex-col'><MenuIcon/><h1></h1></button>
 
      </div>

      <div className="trending">
        <h1 className='mt-5'>Trending</h1>
      </div>
    </div>
  )
}

export default Rightbar
