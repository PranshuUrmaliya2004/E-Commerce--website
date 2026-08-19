// import React, { useState } from 'react'
// import { backendURL } from '../App'
// import axios from 'axios'

// import { toast } from 'react-toastify'
// const Login = ({setToken}) => { 
  
// const [email, setEmail]= useState('')
//   const [password, setPassword]= useState('')
//        const onSubmitHandler = async(event)=>{
//          event.preventDefault()
//       try{

//  const response= await axios.post( backendURL+'/api/user/admin',{email,password})
// if (response.data.success){
//    setToken(response.data.token)
//    toast.success("Login Successful")
// }
      
//       else{
//       toast.error(response.data.message)
//       }
//     }
//     catch(error){
//       console.log(error)
//       toast.error(error.message)
//     }
//   }
  
//     return (

//     <div className='min-h-screen flex items-center justify-center w-full'>
//       <div className='bg-white shadow-md  rounded-lg px-8 py-6 max-w-md'>
//         <h1 className='text-2xl mb-2 font-bold'>Admin Panel</h1>
//         <form  onSubmit={onSubmitHandler}>
//           <div  className='mb-3 min-w-72'>
//             <p className='text-sm font-medium text-gray-700  mb-2'>Email</p>
//             <input onChange={(event) => setEmail(event.target.value)} value={email}  className='rounded-md w-full px-3 py-2   border border-gray-300  outline-none' type="email"  placeholder='your@gmail.com' required/>
//             </div>
//             <div className='mb-3 min-w-72'>
//             <p className='text-sm font-medium text-gray-700  mb-2'>Password</p>
           
//             <input onChange={(event) => setPassword(event.target.value)} value={password} className='rounded-md w-full px-3 py-2   border border-gray-300  outline-none' type="password"  placeholder='Enter your password' required/>
//             </div>
//             <button type='submit' className='bg-blue-500 mt-2 w-full text-white px-4 py-2 rounded-md'>Login</button>
//         </form>
//       </div>
//     </div>
//   )

// }
// export default Login




import React, { useEffect, useState } from 'react';
import { backendURL } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => { 
  
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.post(
        backendURL + '/api/user/admin',
        { email, password }
      );

      if (response.data.success) {

        setToken(response.data.token);
        toast.success("Login Successful ✅");

      } else {

        toast.error(response.data.message || "Invalid Credentials ");

      }

    } catch (error) {

      console.log(error);
      toast.error(error.response?.data?.message || error.message);

    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>

      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>

        <h1 className='text-2xl mb-2 font-bold'>Admin Panel</h1>

        <form onSubmit={onSubmitHandler}>

          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your@gmail.com'
              required
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
            />
          </div>

          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
            />
          </div>

          <button
            type='submit'
            className='bg-blue-500 mt-2 w-full text-white px-4 py-2 rounded-md'
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
