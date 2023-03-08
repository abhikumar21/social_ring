import React from 'react'
import './Home.css'

import Auth from './auth/Auth'
import Myhome from './Myhome'
import {Routes, Route} from 'react-router-dom'


//2:11


const Home = () => {
  return (
    <div className='home h-screen text-white px-8 pt-8 pb-4'>
      <div className='yellow'></div>
      <div className='orange'></div>
     <div className='sections h-full w-full'>
     <Routes>
       <Route path='/' element={<Myhome/>}/>
       <Route path='/register' element={<Auth/>}/>
     </Routes>
     </div>
    </div>
  )
}

export default Home
