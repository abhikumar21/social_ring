import React from 'react'
import './Home.css'
import Auth from './auth/Auth'
import ProPage from './Profile/Propage'
import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Story from './story/Story'
import Chatpage from './ChatPage/Chatpage.js'
import HomePage from './Pghome/HomePage.js'

//1:08


const Home = () => {

  const user = useSelector((state)=> state.authReducer.authData)


  return (
    <div className='home h-screen text-white px-8 pt-8 pb-4'>
      <div className='yellow z-0'></div>
      <div className='orange z-0'></div>
     <div className='sections h-full w-full'>
      
      <Routes>
        <Route path='/' element={user? <Navigate to ="home"/> : <Navigate to = "auth"/>} />
        <Route path='/home' element={user? <HomePage/> : <Navigate to= '../auth'/>} />
        <Route path='/auth' element={user? <Navigate to ='../home'/> : <Auth/>} />
        <Route path='/profile/:id' element= {user ? <ProPage/> : <Navigate to= "../auth" />} />
        <Route path='/story/:id' element= {user ? <Story/> : <Navigate to="../auth" /> } />
        <Route path='/chat' element={user ? <Chatpage/> : <Navigate to='../auth'/>} />
      </Routes>
       

      
     </div>
    </div>
  )
}

export default Home
