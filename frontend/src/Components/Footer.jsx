// // import React from 'react'
// // import { assets } from '../assets/assets'
// // const Footer = () => {
// //   return (
// //   <div>
// //     <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
// //       <img src={assets.logo} alt="" className='mb-5 w-32' />
// //       <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit explicabo, architecto maxime nisi unde autem libero voluptatibus ab, veniam provident tempore suscipit vitae necessitatibus nobis harum dolorem eligendi ipsum asperiores!</p>
// //   </div>
// //   <div>
// //   <p className='text-xs font-medium mb-5'>COMPANY</p>
// //   <ul className='flex flex-col gap-1 text-gray-600'>
// //     <li>Home</li>
// //     <li>About us</li>
// //     <li>Delievery</li>
// //     <li>Privacy</li>
// //   </ul>
// //   </div>
// //   </div>
// //   )
// // }

// // export default Footer


// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className="px-6">
//       <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

//         {/* Column 1 */}
//         <div>
//           <img src={assets.logo} alt="logo" className="mb-5 w-32" />
//           <p className="w-full md:w-2/3 text-gray-600">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, itaque cupiditate ipsam ex non blanditiis. Velit omnis adipisci exercitationem delectus. Repellendus libero, commodi vel sunt quas dolorem doloremque quo ad.
//           </p>
//         </div>

//         {/* Column 2 */}
//         <div>
//           <p className="text-xs font-medium mb-5">COMPANY</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>Home</li>
//             <li>About us</li>
//             <li>Delivery</li>
//             <li>Privacy</li>
//           </ul>
//         </div>

//         {/* Column 3 */}
//         <div>
//           <p className="text-xs font-medium mb-5">GET IN TOUCH</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>+91 98765 43210</li>
//             <li>support@shopnex.com</li>
//           </ul>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Footer


// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <footer className="bg-gray-50 border-t mt-24">
//       <div className="max-w-7xl mx-auto px-6 py-16">

//         <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12 text-sm">

//           {/* Logo & About */}
//           <div>
//             <img src={assets.logo} alt="logo" className="w-32 mb-4" />
//             <p className="text-gray-600 leading-relaxed max-w-sm">
//               Shopnex is your one-stop destination for quality products,
//               fast delivery and secure payments.
//             </p>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-base font-semibold mb-4 text-gray-800">
//               Company
//             </h3>
//             <ul className="space-y-2 text-gray-600">
//               <li className="hover:text-black cursor-pointer">Home</li>
//               <li className="hover:text-black cursor-pointer">About</li>
//               <li className="hover:text-black cursor-pointer">Delivery</li>
//               <li className="hover:text-black cursor-pointer">Privacy Policy</li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-base font-semibold mb-4 text-gray-800">
//               Support
//             </h3>
//             <ul className="space-y-2 text-gray-600">
//               <li>+91 98765 43210</li>
//               <li>support@shopnex.com</li>
//               <li>24×7 Customer Support</li>
//             </ul>
//           </div>

//         </div>

//         {/* Bottom bar */}
//         <div className="border-t mt-12 pt-6 text-center text-xs text-gray-400">
//           © 2025 Shopnex. All rights reserved.
//         </div>

//       </div>
//     </footer>
//   )
// }

// export default Footer



import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12 text-sm">

          {/* Logo + About */}
          <div>
            <img src={assets.logo} alt="logo" className="w-32 mb-4" />
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Shopnex is your trusted destination for quality products,
              secure payments and fast delivery.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-800">
              Company
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Delivery</li>
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-800">
              Support
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>+91 98765 43210</li>
              <li>support@shopnex.com</li>
              <li>24×7 Customer Support</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Shopnex. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer

