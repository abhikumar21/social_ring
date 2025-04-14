import React from 'react'
import Rightbar from '../../comp_home/Rightbar'
import MyHome from '../../comp_home/MyHome/MyHome'
// import Posts from '../../comp_home/Posts'
// import Leftbar from '../../comp_home/Leftbar'
// import { Route } from 'react-router-dom'
// import {Link, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import './HomePage.css'
import Home from '../Home'




const HomePage = () => {
  // const user = useSelector((state) => state.authReducer.authData)
  return (
    <div className='home_page1'>
      <div className='my w-full'>
        <MyHome/>
      </div>
       <Rightbar/>
    </div>
  )
}

export default HomePage
