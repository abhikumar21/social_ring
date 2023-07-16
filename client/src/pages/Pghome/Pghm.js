import React from 'react'
import Leftbar from '../../comp_home/Leftbar'
import Rightbar from '../../comp_home/Rightbar'
import Posts from '../../comp_home/Posts'
import MyHome from '../../comp_home/MyHome/MyHome'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Link, Navigate } from 'react-router-dom'
import './Pghm.css'




const Pghm = () => {
  const user = useSelector((state) => state.authReducer.authData)
  return (
    <div className='home_page1'>
      <div className='my w-full'>
        <MyHome/>
      </div>
       <Rightbar/>
    </div>
  )
}

export default Pghm
