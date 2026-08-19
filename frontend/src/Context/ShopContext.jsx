

// import React, { createContext, useEffect, useState } from 'react'

// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// export const ShopContext = createContext()

// const ShopContextProvider = ({ children }) => {

//   const currency = "₹"
//   const delivery_fee = 50;
//   const backendUrl=import.meta.env.VITE_BACKEND_URL;
//   const [search, setSearch] = useState("")
//   const [showSearch, setShowSearch] = useState(false)
//   const [products,setProducts]=useState([]);
//   const [token,setToken]=useState('')
//   const [cartItems, setCartItems] = useState({})
 

//   const navigate=useNavigate()


//   // ✅ ADD TO CART
// //   const addToCart =async (itemId, size) => {

// //     if (!size) {
// //       toast.error('Select a Product Size')
// //       return
// //     }

// //     const cartData = structuredClone(cartItems)

// //     if (cartData[itemId]) {
// //       cartData([itemId][size]) { 
// //         (cartData[itemId][size]) += 1
// //       } else {
// //         cartData[itemId][size] = 1
// //       }
// //     }
// //     else {
// //       cartData[itemId] = {}
// //       cartData[itemId][size] = 1
// //     }
    

// //     setCartItems(cartData);

// //     if(token){
// //       try{
// //     await axios.post(
// //       backendUrl + "/api/cart/add",
// //       { itemId, size },   // body
// //      {headers:{ Authorization : 'Bearer ' + token }}
// // );

// //       }
// //       catch(error){
// //                  console.log(error)
// //                  toast.error(error.message)
// //       }
// //     }
// //   }


// const addToCart = async (itemId, size) => {

//   if (!size) {
//     toast.error("Select Product Size")
//     return
//   }

//   // Copy cart safely
//   const cartData = structuredClone(cartItems)

//   // If product already exists
//   if (cartData[itemId]) {

//     // If size already exists
//     if (cartData[itemId][size]) {

//       cartData[itemId][size] += 1

//     } else {

//       cartData[itemId][size] = 1
//     }

//   } 
//   // If product not exists
//   else {

//     cartData[itemId] = {}

//     cartData[itemId][size] = 1
//   }

//   // Update state
//   setCartItems(cartData)


//   // Save to backend (if logged in)
//   if (token) {

//     try {

//       await axios.post(
//         backendUrl + "/api/cart/add",
//         { itemId, size },
//         {
//           headers: {
//             Authorization: "Bearer " + token
//           }
//         }
//       )

//     } catch (error) {

//       console.log(error)
//       toast.error("Cart Error")
//     }
//   }
// }



//   // ✅ TOTAL CART COUNT (for navbar badge)
//   const getCartCount = () => {
//     let totalCount = 0

//     for (const items in cartItems) {
//       for (const size in cartItems[productId]) {
//         if (cartItems[productId][size] > 0) {
//           totalCount += cartItems[productId][size]
//         }
//       }
//     }

//     return totalCount
//   }

//   // ✅ UPDATE QUANTITY (Cart Page)
//   const updateQuantity =async (itemId, size, quantity) => {

//     const cartData = structuredClone(cartItems)

//     if (quantity <= 0) {
//       delete cartData[itemId][size]

//       if (Object.keys(cartData[itemId]).length === 0) {
//         delete cartData[itemId]
//       }
//     } else {
//       cartData[itemId][size] = quantity
//     }

//     setCartItems(cartData)

//   if(token){
//      try{
    
//       const response= await axios.post(backendUrl + "/api/cart/update",{itemId,size,quantity},{ headers: { Authorization: 'Bearer ' + token } })
          
//       if(response.data.success){
//         setCartItems(response.data.cartData);

//       }


//      }
//      catch(error) {
// console.log(error)
//                  toast.error(error.message)

//      }
    
//   }

//   }
// // const getCartAmount= ()=>{
// // let  totalAmount=0;
// // for(const items in cartItems){
// //   let itemInfo = products.find((product)=>product._id === items);
// //   for(const item in cartItems[items]){
// //     try{
// //       if(cartItems[items][item]>0 ){
// //        totalAmount += itemInfo.price *cartItems[items][item]

// //       }
// //     }catch(error){

// //     }
// //   }
// // }
// // return totalAmount;
// // }


// const getCartAmount = () => {

//   let total = 0;

//   for (const id in cartItems) {

//     const product = products.find(p => p._id === id);

//     if (!product) continue;

//     for (const size in cartItems[id]) {

//       const qty = cartItems[id][size];

//       total += product.price * qty;
//     }
//   }

//   return total;
// };

// const getProductsData=async()=>{
//     try{
        
//        const response= await axios.get( backendUrl + '/api/product/list')
       
         
//         if(response.data.success){
//           setProducts(response.data.products)

//         }
//         else{
//           toast.error(response.data.error)
//         }



//     }
//     catch(error){
//  console.log(error)
//  toast.error(error.data.message)
 
//     }
//   }

//   const getUserCart = async () => {
//   if(!token) return; // prevent call without token
//   try {
//     const response = await axios.post(
//       backendUrl + "/api/cart/get",
//       {},
//       { headers: { Authorization: 'Bearer ' + token } }
//     );

//     if(response.data.success) {
//       setCartItems(response.data.cartData);
//     } 

//   } catch (error) {
//     console.log(error);
//     toast.error(error.response?.data?.message || error.message);
//   }
// };


 




//   useEffect(()=>{
//       getProductsData();
//   },[])
//   useEffect(()=>{
//     if(!token && localStorage.getItem('token')){
//       setToken(localStorage.getItem('token'))
//        getUserCart(localStorage.getItem('token'));
//     }
//   },[])


//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     setCartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,token,setToken

//   }

//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   )
// }

// export default ShopContextProvider







import React, { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {

  const currency = "₹"
  const delivery_fee = 50

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate()

  // ================= STATES =================
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({})

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  )

  // ================= GET PRODUCTS =================
  const getProductsData = async () => {
    try {

      const res = await axios.get(
        backendUrl + "/api/product/list"
      )

      if (res.data.success) {
        setProducts(res.data.products)
      }

    } catch (error) {
      console.log(error)
      toast.error("Products load failed")
    }
  }

  // ================= GET USER CART =================
  const getUserCart = async (userToken) => {

    if (!userToken) return

    try {

      const res = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: "Bearer " + userToken
          }
        }
      )

      if (res.data.success) {
        setCartItems(res.data.cartData || {})
      }

    } catch (error) {
      console.log(error)
    }
  }

  // ================= ADD TO CART =================
  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error("Select size")
      return
    }

    const cartData = structuredClone(cartItems)

    if (!cartData[itemId]) {
      cartData[itemId] = {}
    }

    cartData[itemId][size] =
      (cartData[itemId][size] || 0) + 1

    setCartItems(cartData)

    if (!token) return

    try {

      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, size },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

    } catch (error) {
      console.log(error)
    }
  }

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (itemId, size, quantity) => {

    const cartData = structuredClone(cartItems)

    if (quantity <= 0) {

      delete cartData[itemId][size]

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]
      }

    } else {

      cartData[itemId][size] = quantity
    }

    setCartItems(cartData)

    if (!token) return

    try {

      await axios.post(
        backendUrl + "/api/cart/update",
        { itemId, size, quantity },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )

    } catch (error) {
      console.log(error)
    }
  }

  // ================= CART COUNT =================
  const getCartCount = () => {

    let count = 0

    for (const id in cartItems) {

      for (const size in cartItems[id]) {

        count += cartItems[id][size]
      }
    }

    return count
  }

  // ================= CART TOTAL =================
  const getCartAmount = () => {

    let total = 0

    for (const id in cartItems) {

      const product = products.find(
        p => p._id === id
      )

      if (!product) continue

      for (const size in cartItems[id]) {

        total +=
          product.price * cartItems[id][size]
      }
    }

    return total
  }

  // ================= LOAD DATA =================
  useEffect(() => {

    getProductsData()

  }, [])

  useEffect(() => {

    if (token) {
      getUserCart(token)
    }

  }, [token])

  // ================= CONTEXT DATA =================
  const value = {

    products,
    currency,
    delivery_fee,

    search,
    setSearch,

    showSearch,
    setShowSearch,

    cartItems,
    setCartItems,

    addToCart,
    updateQuantity,

    getCartCount,
    getCartAmount,

    backendUrl,

    token,
    setToken,

    navigate
  }

  return (

    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>

  )
}

export default ShopContextProvider

 
