import React from 'react'
import './Home.css'
import Posts from '../comp_home/Posts'
import Leftbar from '../comp_home/Leftbar.js'
import Rightbar from '../comp_home/Rightbar.js'
import Auth from './auth/Auth'

//2:11


const Home = () => {
  return (
    <div className='home h-screen text-white px-8 pt-8 pb-4'>
      <div className='yellow'></div>
      <div className='orange'></div>
     <div className='sections h-full w-full'>
       {/* <Leftbar/>
       <Posts/>
       <Rightbar/> */}

       <Auth/>
     </div>
    </div>
  )
}

export default Home
