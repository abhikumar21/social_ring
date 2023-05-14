import "./Leftbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faDragon} from '@fortawesome/free-solid-svg-icons'
import Bot from '../img_home/bot.jpg'
import { Button } from "@mui/material"
import { useSelector } from "react-redux"




const Leftbar = () => {

   const {user} = useSelector((state)=> state.authReducer.authData)

  return (
    <div className='sidebar flex flex-col z-50'>

      <span className="searchbar rounded-lg">
         <FontAwesomeIcon icon={faDragon} className="sbx"/>
         <input className='sbx w-full rounded-xl ml-2 h-10 px-5 mr-5' placeholder='search'></input>
         <FontAwesomeIcon icon={faMagnifyingGlass} className="sbx mr-3"/>
         </span>

     <div className='cardbg h-1/3 w-full mt-12'>
      <div className='h-1/2 bg-transparent text-black flex justify-center align-middle'>
        <img className="dpro absolute h-32 w-32 mt-10 rounded-full" src={Bot}></img>
        <h2 className="relative font-bold text-2xl">Abhishek Kumar</h2>
      </div>

      <div className="info">
      <hr className="hr1 mb-5"/>
      <div className='grid1 text-black'>
        <div className="f1"><p><strong>3435</strong><p/>Followers</p></div>
        <div className="vl bg-slate-500 w-1"></div>
        <div className="f1"><p><strong>3435</strong><p/>Following</p></div>
      </div>
      <hr className="hr2 mt-5"/>

       <span className="flex align-middle justify-center mt-5 font-bold"><button className="profilebtn text-violet-800 text-2xl">My Profile</button></span>
      </div>
      


     </div>

      
     
    </div>
  )
}

export default Leftbar
