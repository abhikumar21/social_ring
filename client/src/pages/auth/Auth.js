import React, { useState } from 'react'
import './Auth.css'
import {useDispatch} from 'react-redux'
import { logIn, signUp } from '../../action/AuthAction';




const Auth = () => {

  const dispatch = useDispatch();
  
  const [isSignUp, setIsSignUp] = useState(true)
  const [confirmPass, setConfirmPass] = useState(true)
  const [data, setData] = useState({firstname:"", lastname:"", username:"", password:"", password:"", cpassword:""})

 const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
 };

 const handeleSubmit =(e) => {
 
   e.preventDefault();

   if(isSignUp) {
    data.password === data.cpassword ? dispatch(signUp(data)) : setConfirmPass(false);
    console.log("signup")
   }
   else{
    dispatch(logIn(data)) 
    console.log("login") 
   }
 };

 


 const resetForm = () => {
  setData(
    {firstname:"", lastname:"", username:"", password:"", password:"", cpassword:""}
  )
};



  return (
  <div className='auth'>
    <div className='a-left'>
      <h1 className='text-7xl pb-5'>Social Ring</h1>
      <h5>Explore the world</h5>
    </div>


   { isSignUp ?   
   //SignUp
   <div className='a-right'>
  <form type="submit" method="POST" 
  // onSubmit={handeleSubmit} 
  className='form px-10 flex flex-col'>
  <h1 className='my-5 text-4xl'>Sign Up</h1>
   <span className='my-2'>
     <input 
     placeholder='First Name' className='mr-2'
     type="text"
     name="firstname"
     value={data.firstname}
     onChange={handleChange}
     ></input>
     <input 
     type="text"
     name="lastname"
     placeholder='Last Name'
     value={data.lastname}
     onChange={handleChange}
     ></input>
   </span>

   <span className='my-2'>
     <input 
     type="text"
     name="username"
     placeholder='Username' className='w-full'
     value={data.username}
     onChange={handleChange}
     ></input>
     </span>

   <span className='my-2'>
     <input 
     type="text"
     name='password'
     placeholder='Password' className='mr-2'
     value={data.password}
     onChange={handleChange}
     ></input>

     <input 
     type="text"
     name="cpassword"
     placeholder='Confirm password'
     value={data.cpassword}
     onChange={handleChange}
     ></input>
   </span>

   {!confirmPass ? <div className='confirm text-red-700'>*Confirm Password is not same</div> : <div></div>}

   <span className='flex justify-between my-4'>
     <a href="#" className='' onClick={()=>{setIsSignUp(true); resetForm()}}>Already have an account. Login </a>
     <button className='rbutton' 
     onClick={handeleSubmit}
     >Sign Up</button>
   </span>
  </form>
 
 </div>   : 
 //Login
  <div className='a-right'>
  
  <form method="POST" className='form px-10 flex flex-col'>
  <h1 className='my-5 text-4xl'>Login</h1>
  

   <span className='my-2'>
     <input 
     type="text"
     name="username"
     placeholder='Username' className='w-full'
     value={data.username}
     onChange={handleChange}
     ></input>
    </span>

   <span className='my-2'>
     <input 
     type="text"
     name='password'
     placeholder='Password' className='w-full'
     value={data.password}
     onChange={handleChange}
     ></input>
   </span>

   <span className='flex justify-between my-4'>
   <a href="#" className='mr-6' onClick={()=>setIsSignUp(false)}>Don't have an account? Sign Up </a>
     <button className='rbutton'>Login</button>
   </span>
  </form>
 
 </div>}


   {/* <Login/> */}
   {/* <SignUp/> */}

  </div>
  )
};





export default Auth
