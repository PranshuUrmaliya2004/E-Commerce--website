import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {

  const [currentState,setCurrentState]=useState('Login')
  const{token,setToken,navigate,backendUrl}=useContext(ShopContext);
  const[name,setName]=useState('')
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')
    const onSubmithandler= async(event)=>{
      event.preventDefault();
      try{ 
      if(currentState === 'Sign Up'){ //signup
    const  response = await axios.post(backendUrl + "/api/user/register",{name,email,password}) //for Sign Up 
       
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem('token',response.data.token)
    }else{
      toast.error(response.data.message)
    }

      }else{//login
         
        const response= await axios.post(backendUrl + "/api/user/login",{email,password})
  if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem('token',response.data.token)
    }else{
      toast.error(response.data.message)
    }
         
      }
      
      }
      catch(error){
console.log(error)
toast.error(error.message)
      }
    }

    useEffect(()=>{
      if(token){
           navigate('/')
 } },[token])
  
  return (
    <form  onSubmit={onSubmithandler}  className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

<div className='inline-flex  items-center gap-2 mb-2 mt-10'>
  <p className='prata-regular text-3xl'>{currentState}</p>
  <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>

</div>
 {currentState === 'Login' ? '': <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full  px-3 py-2  border border-gray-800' placeholder='Name'required  />}
  <input  onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" className='w-full  px-3 py-2  border border-gray-800' placeholder='Email' required/>
  <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full  px-3 py-2  border border-gray-800' placeholder='Password' required/>
   <div className='w-full flex justify-between text-sm mt-2'>
    <p className='cursor-pointer   text-gray-600 hover:text-black'>Forgot your Password</p>
    {
      currentState === 'Login'
      ? <p onClick={() =>{ setCurrentState('Sign Up')}} className="cursor-pointer">Create New Account</p>
       : <p onClick={() =>{ setCurrentState('Login')}} className="cursor-pointer">Login Here</p>
       
    }
 
   </div>
   <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login'? "Sign In":"Sign Up"  }
   </button>
    </form>


// <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-6 rounded shadow">

//   {/* Title */}
//   <div className="inline-flex items-center gap-2 mb-2">
//     <p className="prata-regular text-3xl">{currentState}</p>
//     <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//   </div>

//   {/* Name (only for Sign Up) */}
//   {currentState !== 'Login' && (
//     <input
//       type="text"
//       placeholder="Name"
//       className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
//       required
//     />
//   )}

//   {/* Email */}
//   <input
//     type="email"
//     placeholder="Email"
//     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
//     required
//   />

//   {/* Password */}
//   <input
//     type="password"
//     placeholder="Password"
//     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
//     required
//   />

//   {/* Forgot password (RIGHT aligned like Flipkart) */}
//   <div className="w-full flex justify-end text-sm">
//     <button
//       type="button"
//       className="text-blue-600 hover:underline"
//     >
//       Forgot password?
//     </button>
//   </div>

//   {/* Submit Button */}
//   <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//     {currentState === 'Login' ? 'Login' : 'Create Account'}
//   </button>

//   {/* Toggle Login / Signup */}
//   <p
//     className="text-sm text-gray-600 cursor-pointer hover:underline"
//     onClick={() =>
//       setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
//     }
//   >
//     {currentState === 'Login'
//       ? "New to Shop? Create an account"
//       : "Already have an account? Login"}
//   </p>

// </form>


  )
}

export default Login

