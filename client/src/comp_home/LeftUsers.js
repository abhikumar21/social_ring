import React from 'react'
import Bot from '../img_home/bot.jpg'
import './LeftUsers.css'

const LeftUsers = () => {
  return (
    <>
        <div className='h-15 w-15 rounded-full overflow-hidden'><img src={Bot} className='h-full w-auto'></img></div>
        <div className='name text-black'>
           <h3 className='text-xl'>Name</h3>
           <h5 className='text-sm opacity-80'>@Username</h5>
         </div> 
        <button>Follow</button>
        
    </>
  )
}

export default LeftUsers
