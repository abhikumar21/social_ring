

import React from 'react'
import Posts from '../../comp_home/Posts'
import Leftbar from '../Leftbar'
import './MyHome.css'

const MyHome = () => {
  return (
  
    <div className='myhome '>
    <Leftbar/>
      <Posts/>
    </div>
    
  )
}

export default MyHome
