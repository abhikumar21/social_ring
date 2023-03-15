import React from 'react'
import Posts from '../comp_home/Posts'
import Leftbar from '../comp_home/Leftbar.js'
import Rightbar from '../comp_home/Rightbar.js'

const Myhome = () => {
  return (
    <>
       <Leftbar/>
       <Posts/>
       <Rightbar/>
    </>
  )
}

export default Myhome
