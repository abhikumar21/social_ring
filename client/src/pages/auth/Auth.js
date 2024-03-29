import React, { useState } from 'react'
import './Auth.css'
import {useNavigate} from 'react-router-dom'


const Auth = () => {

  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false)
  const [confirmPass, setConfirmPass] = useState(false)
  const [data, setData] = useState({firstname:"", lastname:"", username:"", password:"", password:"", cpassword:""})

 const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
 };



const handeleSubmitRegister = async(e) => {
  e.preventDefault();

  const {firstname, lastname, username, password, cpassword} = data;  //name = user.name
  
  const res = await fetch("/auth/register", {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstname, lastname, username, password, cpassword
    })
  })

  const info = await res.json();
  if(res.status===500 || !info) {
    window.alert("Registration Failed");
    console.log("Invalid registration")
  }
  else{
    window.alert("Registration Successfull");
    console.log("Successful Registration");
    navigate('/');
  }
}

const handeleSubmitLogin = async(e) => {
  e.preventDefault();
  const {username, password} = data;
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      username, password
    })
  })

  const info = await res.json();
  if(res.status==200 && info) {
    window.alert("LOGIN SUCCESSFUL")
    // console.log(info);
    navigate('/');
  }
  else{
    window.alert("INVALID CREDENTIALS")
  }
}

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


   { !isSignUp ?   
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

   {confirmPass ? <div className='confirm text-red-700'>*Confirm Password is not same</div> : <div></div>}

   <span className='flex justify-between my-4'>
     <a href="#" className='' onClick={()=>{setIsSignUp(true); resetForm()}}>Already have an account. Login </a>
     <button className='rbutton' 
     onClick={handeleSubmitRegister}
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
     <button className='rbutton' onClick={handeleSubmitLogin}>Login</button>
   </span>
  </form>
 
 </div>}


   {/* <Login/> */}
   {/* <SignUp/> */}

  </div>
  )
};





export default Auth;
