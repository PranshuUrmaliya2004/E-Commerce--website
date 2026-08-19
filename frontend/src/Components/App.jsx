

// import React from 'react'
// import { Routes, Route } from 'react-router-dom'

// import Home from '../Pages/Home'
// import Login from '../Pages/Login'
// import Order from '../Pages/Order'
// import Cart from '../Pages/Cart'
// import Product from '../Pages/Product'
// import Contact from '../Pages/Contact'
// import Collection from '../Pages/Collection'
// import Placeorder from '../Pages/Placeorder'
// import About from '../Pages/About'
// import Navbar from './Navbar'
// import HeroBanner from './HeroBanner'
// import Footer from './Footer'
// import ShopContextProvider from '../Context/ShopContext'
// import SearchBar from './SearchBar'
//   import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

//  import AddProductForm from './AddProductForm'
// import Addproduct from '../Pages/admin/Addproduct'
 

  
// const App = () => {
//   return (
//     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
//       <ToastContainer/>
//       <Navbar />
//       <SearchBar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/order' element={<Order />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/product/:productid' element={<Product />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/collection' element={<Collection />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/placeorder' element={<Placeorder />} />
//         <Route path="/add-product" element={<Addproduct />} />  ✅
       
      

//       </Routes>
     
//       <Footer />
  
  
//     </div>
//   )
// }

// export default App




import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Order from '../Pages/Order'
import Cart from '../Pages/Cart'
import Product from '../Pages/Product'
import Contact from '../Pages/Contact'
import Collection from '../Pages/Collection'
import Placeorder from '../Pages/Placeorder'
import About from '../Pages/About'

import Navbar from './Navbar'
import Footer from './Footer'
import SearchBar from './SearchBar'

import ShopContextProvider from '../Context/ShopContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from '../Pages/verify'

// import Addproduct from '../Pages/admin/Addproducts'

const App = () => {
  return (
    <ShopContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        
        <ToastContainer />
        <Navbar />
        <SearchBar />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productid" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/placeorder" element={<Placeorder />} />


          <Route path="/verify" element={<Verify/>} />



          {/* ADMIN */}
          {/* <Route path="/add-product" element={<Addproduct />} /> */}
        </Routes>

        <Footer />

      </div>
    </ShopContextProvider>
  )
}

export default App
