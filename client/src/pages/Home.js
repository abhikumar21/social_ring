import React from 'react'
import './Home.css'
<<<<<<< HEAD

import Auth from './auth/Auth'
import Myhome from './Myhome'
import {Routes, Route} from 'react-router-dom'

=======
import Auth from './auth/Auth'
import Pghm from './Pghome/Pghm'
import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
>>>>>>> 7e36a2932fe8411019514aa59c74b62f838b638d

//1:08


const Home = () => {

  const user = useSelector((state)=> state.authReducer.authData)


  return (
    <div className='home h-screen text-white px-8 pt-8 pb-4'>
      <div className='yellow'></div>
      <div className='orange'></div>
     <div className='sections h-full w-full'>
<<<<<<< HEAD
     <Routes>
       <Route path='/' element={<Myhome/>}/>
       <Route path='/register' element={<Auth/>}/>
     </Routes>
=======
      
      <Routes>
        <Route path='/' element={user? <Navigate to ="home"/> : <Navigate to = "auth"/>} />
        <Route path='/home' element={user? <Pghm/> : <Navigate to= '../auth'/>} />
        <Route path='/auth' element={user? <Navigate to ='../home'/> : <Auth/>} />
      </Routes>
       

      
>>>>>>> 7e36a2932fe8411019514aa59c74b62f838b638d
     </div>
    </div>
  )
}

export default Home
