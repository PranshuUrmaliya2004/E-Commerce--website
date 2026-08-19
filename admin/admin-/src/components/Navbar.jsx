// import React from 'react'
// import { assets } from '../assets/assets'
// const Navbar = () => {
//   return (
//     <div className='flex items-center py-[10px] px-[4%] justify-between'>
//         <img className='w-40' src={assets.Shopnex_logo} alt="" />
//         <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
//     </div>
//   )
// }

// export default Navbar


import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center h-16 px-[4%] justify-between shadow'>

      {/* Logo */}
      <img
        className='w-[max(15%,80px)]'
        src={assets.Shopnex_logo}
        alt="ShopNex Logo"
      />

      {/* Button */}
      <button onClick={() => setToken("")} className='bg-gray-600 text-white px-4 py-1.5 sm:px-6 rounded-full text-xs sm:text-sm'>
        Logout
      </button>

    </div>
  )
}

export default Navbar
