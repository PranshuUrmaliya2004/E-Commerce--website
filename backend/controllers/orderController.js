

// Place order using Cash on Delivery

import UserModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from 'stripe'
// import Razorpay from "razorpay";


const currency= "inr";
const deliveryCharge=10

//gateway initialize
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
 
// const razorpayinstance= new Razorpay({
//   key_id:process.env.RAZORPAY_KEY_ID,
//   key_secret:process.env.RAZORPAY_KEY_SECRET
// })

const placedOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
  //      address: {
  //   ...address,
  //   name: `${address.firstname} ${address.lastname}`
  // },
      paymentMethod: "COD", //  FIXED
      payment: false, 
       status: "Placed",       // FIXED
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};





//Placed order using Stripe Mathod
const placedStripe= async(req,res)=>{
 try{
     const { userId, items, amount, address } = req.body;
    //  const {origin} = req.header;
    const origin = req.headers.origin;

     
     const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "STRIPE", //  FIXED
      payment: false, 
       status: "Placed",       // FIXED
      date: Date.now(),
    };
    
  const newOrder = new orderModel(orderData);
    await newOrder.save();

 const line_items = items.map((item) =>({

price_data:{
  currency:currency,
 product_data:{
         name:item.name
  },
  unit_amount : item.price *100
},
quantity:item.quantity

 }));

 line_items.push({
  
price_data:{
  currency:currency,
  product_data:{
         name:'Delivery Charges'
  },
  unit_amount : deliveryCharge *100
},
quantity:1
 })

const session=await stripe.checkout.sessions.create({
  success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,

 line_items,
 mode:'payment'
})
res.json({success:true,session_url:session.url})
 }
 catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
 }
}
 // verify Stripe
 const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });

      return res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//placed order using Rozarpay
// const placedRozarPay= async(req,res)=>{
    
// try{
//      const { userId, items, amount, address } = req.body;
   
//      const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "Razorpay", //  FIXED
//       payment: false, 
//        status: "Placed",       // FIXED
//       date: Date.now(),
//     };
    
//   const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const options= {
//      amount:amount*100,
//      currency:currency.toUpperCase(),
//      receipt:newOrder._id.toString()

//     }
//      await razorpayinstance.orders.create(options,(error,order)=>{
//   if(error){
//     console.log(error)
//       return res.json({success:false,message:error})

//   }
//    res.json({success:true,order})
//     })
//   }
//   catch(error){
//               console.log(error);
//     res.json({ success: false, message: error.message });    
//   }


// }



// const placedRozarPay = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     // 1️⃣ Create order in database
//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "Razorpay",
//       payment: false,
//       status: "Placed",
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // 2️⃣ Razorpay order options
//     const options = {
//       amount: amount * 100, // convert INR to paise
//       currency: currency.toUpperCase(), // "INR"
//       receipt: newOrder._id.toString(),
//       payment_capture: 1,
//     };

//     // 3️⃣ Create Razorpay order
//     const razorpayOrder = await razorpayinstance.orders.create(options);

//     // 4️⃣ Return order info to frontend
//     res.json({ success: true, order: razorpayOrder, orderId: newOrder._id });
//   } catch (error) {
//     console.log("Razorpay Error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };




// ✅ FAKE Razorpay Payment (NO KYC, NO API, NO SDK)
const placedRozarPay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay (Fake)",
      payment: true,        // ✅ payment successful
      status: "Placed",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // clear cart after fake payment
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Fake Razorpay payment successful",
      orderId: newOrder._id
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Fake Razorpay verification (optional)
const verifyFakePayment = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    // Mark order as paid (just in case)
    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Fake Razorpay payment verified successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//placed order using Paytm
// const placedPaytm= async(req,res)=>{
    
// }
// //placed order using PhonePe
// const placedPhonepe= async(req,res)=>{
    
// }




// ===== Paytm Payment (Fake) =====
const placedPaytm = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // 1️⃣ Order create in DB
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Paytm (Fake)",
      payment: true,      // ✅ Payment successful (fake)
      status: "Placed",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // 2️⃣ Clear cart
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    // 3️⃣ Response
    res.json({
      success: true,
      message: "Fake Paytm payment successful",
      orderId: newOrder._id,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ===== PhonePe Payment (Fake) =====
const placedPhonepe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // 1️⃣ Order create in DB
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "PhonePe (Fake)",
      payment: true,      // ✅ Payment successful (fake)
      status: "Placed",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // 2️⃣ Clear cart
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    // 3️⃣ Response
    res.json({
      success: true,
      message: "Fake PhonePe payment successful",
      orderId: newOrder._id,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};





//All order for Admin Panel

const allOrder = async(req,res)=>{ 
  try{ const orders= await orderModel.find({})
   res.send({success: true,orders})
   }


catch(error){ console.log(error);
   res.json({ success: false, message: error.message }); 
  } }


//All order for frontend 
const userOrder = async(req,res)=>{
 try{
  const {userId}=req.body;
  const orders= await orderModel.find({userId})

  res.send({success: true,orders})



 }
  catch(error){

 console.log(error);
    res.json({ success: false, message: error.message });

  }
}
//update order status from Admin Panel
const updateStatus = async(req,res)=>{
     try{
      const {orderId,status} = req.body
        //  req.findByIdAndUpdate(orderId,[status])
        await orderModel.findByIdAndUpdate(orderId, { status })

         res.json({success:true,message:'Status updated'})
     }
     catch(error){
      console.log(error)
res.json({ success: false, message: error.message });

     }
}

// const updateStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;

//     await orderModel.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Status updated successfully"
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };



//new function add for delete order history

// Delete order from Admin Panel
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    await orderModel.findByIdAndDelete(orderId);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};










export {verifyStripe,placedOrder,placedStripe,placedPaytm,placedRozarPay,placedPhonepe,allOrder,userOrder,updateStatus, verifyFakePayment ,deleteOrder};