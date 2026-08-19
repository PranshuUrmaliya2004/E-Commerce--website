

import React, { useContext, useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify";

import Title from '../Components/Title'
import CartTotals from '../Components/CartTotals'
import { assets } from '../assets/assets'

import { ShopContext } from '../Context/ShopContext'
// import { startSession } from 'mongoose';

const Placeorder = () => {
  const[method,setMethod]=useState("cod")
    const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}= useContext(ShopContext);
 const [formdata,setFormdata]= useState({
  firstName: '',
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
   zipcode:"",
   country:"",
   phone:""

 })

   const onChangeHandler=(event)=>{
      
    const name= event.target.name;
    const value= event.target.value;

    setFormdata({...formdata,[name]:value})

   }
const onSubmitHandler= async(event)=>{
  event.preventDefault();
  try{

    let orderItems= [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          const itemInfo=structuredClone(products.find(product=>product._id === items))
          if(itemInfo) {
            itemInfo.size= item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);

          }
         


        }
      }
    }
     console.log(orderItems)

    let orderData={
        address:formdata,
        items:orderItems,

        amount:getCartAmount() + delivery_fee,
          paymentMethod: method 
    }
   switch (method) {
    //Api calls for cod
case 'cod':
const response= await axios.post(backendUrl + "/api/order/place",orderData,{
          headers: {
            Authorization: "Bearer " + token
          }
        
        });
if(response.data.success){
  setCartItems({});
  navigate('/orders')

}else{
  toast.error(response.data.message)
}
break;
  
case'stripe':

 const responseStripe= await axios.post( backendUrl + '/api/order/stripe',orderData,{ headers: {
            Authorization: "Bearer " + token
          }
        
        });



 if(responseStripe.data.success){
  const {session_url}=responseStripe.data
  window.location.replace(session_url)

 }else{
  toast.error(responseStripe.data.message)
 }
 
// break;
//  case'razorpay':
//  const responseRazorpay= await axios.post(backendUrl + '/api/order/razorpay',orderData,{ headers: {
//             Authorization: "Bearer " + token
//           }
        
//         });
//         if(responseRazorpay.data.success){
//           console.log(responseRazorpay.data.order)

//         }



case 'razorpay':
  const responseRazorpay = await axios.post(
    backendUrl + '/api/order/razorpay',
    orderData,
    { headers: { Authorization: "Bearer " + token } }
  );

  if(responseRazorpay.data.success){
    // Directly mark payment as success (fake)
    await axios.post(
      backendUrl + '/api/order/verify-fake',
      { orderId: responseRazorpay.data.orderId, userId: token.userId },
      { headers: { Authorization: "Bearer " + token } }
    );

    toast.success("Payment Successful (Fake Razorpay)");
    setCartItems({});
    navigate("/orders");
  }
  break;




  case 'paytm':
  const responsePaytm = await axios.post(
    backendUrl + '/api/order/paytm',
    orderData,
    { headers: { Authorization: "Bearer " + token } }
  );

  if(responsePaytm.data.success){
    toast.success("Payment Successful (Fake Paytm)");
    setCartItems({});
    navigate("/orders");
  } else {
    toast.error(responsePaytm.data.message);
  }
break;
//phonepe fake payment
case 'phonepe':
  const responsePhonePe = await axios.post(
    backendUrl + '/api/order/phonepe',
    orderData,
    { headers: { Authorization: "Bearer " + token } }
  );

  if(responsePhonePe.data.success){
    toast.success("Payment Successful (Fake PhonePe)");
    setCartItems({});
    navigate("/orders");
  } else {
    toast.error(responsePhonePe.data.message);
  }
break;




default:
break;





   }


  }
catch(error){
 console.error(error);
 
}
}

 
  return (
    <form onSubmit={onSubmitHandler}  className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

      {/* -------- LEFT SIDE -------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input  required onChange={onChangeHandler}
            name='firstName' value={formdata.firstName}
            className="border rounded py-2 px-3 w-full"
            placeholder="First name"
          />
          <input required onChange={onChangeHandler}
           name='lastName' value={formdata.lastName}
            className="border rounded py-2 px-3 w-full"
            placeholder="Last name"
          />
        </div>

        <input required onChange={onChangeHandler}
           name='email' value={formdata.email}
          className="border rounded py-2 px-3 w-full"
          placeholder="Email address"
        />

        <input required onChange={onChangeHandler}
         name='street' value={formdata.street}
          className="border rounded py-2 px-3 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input required onChange={onChangeHandler}
             name='city' value={formdata.city}
            className="border rounded py-2 px-3 w-full"
            placeholder="City"
          />
          <input required onChange={onChangeHandler}
           name='state' value={formdata.state}
            className="border rounded py-2 px-3 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler}
            name='zipcode' value={formdata.zipcode}
            className="border rounded py-2 px-3 w-full"
            placeholder="Zipcode"
          />
          <input required   onChange={onChangeHandler}
        name='country' value={formdata.country}
            className="border rounded py-2 px-3 w-full"
            placeholder="Country"
          />
        </div>

        <input required onChange={onChangeHandler}
           name='phone' value={formdata.phone}
          className="border rounded py-2 px-3 w-full"
          placeholder="Phone"
        />
      </div>

      {/* -------- RIGHT SIDE -------- */}
      <div className="mt-8 w-full sm:max-w-[420px]">

        <CartTotals />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
        </div>

        {/* -------- PAYMENT OPTIONS -------- */}
        <div className="flex gap-3 flex-col lg:flex-row">

          <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border  h-10  px-1  cursor-pointer rounded">
            {/* <p className={`w-4 h-4 border rounded-full` }></p> */}
             <span className={`w-4 h-4 border rounded-full ${method ==='stripe'? 'bg-green-400':''}`}></span>
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
          </div>
          <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border h-10  px-1  cursor-pointer rounded">
            {/* <p className={`w-4 h-4 border rounded-full` }></p> */}
             <span className={`w-4 h-4 border rounded-full ${method ==='razorpay'? 'bg-green-400':''}`}></span>
            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="razorpay" />
          </div>
          <div onClick={()=>setMethod('paytm')} className="flex items-center gap-3 border h-10  px-1   cursor-pointer rounded">
            {/* <p className={`w-4 h-4 border rounded-full` }></p> */}
             <span className={`w-4 h-4 border rounded-full ${method ==='paytm'? 'bg-green-400':''}`}></span>
            <img className="h-8 mx-4" src={assets.paytm_logo} alt="paytm" />
          </div>
             </div>
             <br />
             <div  className="flex gap-3 flex-col lg:flex-row">
              <div onClick={()=>setMethod('phonepe')} className="flex items-center gap-3 border h-10  px-1   cursor-pointer rounded">
            {/* <p className={`w-4 h-4 border rounded-full` }></p> */}
             <span className={`w-4 h-4 border rounded-full ${method ==='phonepe'? 'bg-green-400':''}`}></span>
            <img className="h-10 mx-6" src={assets.phonepe_logo} alt="phonepe" />
          </div>
             
          <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border h-10 px-1 cursor-pointer rounded">
            <span className={`w-4 h-4 border rounded-full ${method ==='cod'? 'bg-green-400':''}`}></span>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>

          </div>

        </div>
      
      </form>
   
  )
  }


export default Placeorder
