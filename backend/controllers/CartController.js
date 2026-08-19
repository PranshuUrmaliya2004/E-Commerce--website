

//add Product to User Cart

import UserModel from "../models/userModel.js";

const addToCart=async(req,res)=>{
  
    try{
        const {itemId,userId,size}=req.body;
        const userData= await UserModel.findById(userId)

        const cartData= await userData.cartData

        if(cartData[itemId]){
          if(cartData[itemId][size]){
            cartData[itemId][size]+=1
          }else{
              cartData[itemId][size] =1;
          }
        }
          else{
            cartData[itemId]={}
            cartData[itemId][size]=1
          }
        
          await UserModel.findByIdAndUpdate(userId,{cartData})
          

          res.json({success:true,message:"Added To Card"})
        }
      
        catch(error){
            console.log(error)
            res.json({success:false , message:error.message})
        }
    
    
      }




//Update User Cart

const updateCart=async(req,res)=>{
try{
  const{userId,itemId,size,quantity}=req.body;
  const userData= await UserModel.findById(userId);

 

    const cartData=  userData.cartData
  
    // cartData[itemId][size]=quantity;
//     if (!cartData[itemId]) {
//   return res.json({
//     success: false,
//     message: "Item not found in cart",
//   });
// }

// if (!cartData[itemId][size]) {
//   return res.json({
//     success: false,
//     message: "Size not found",
//   });
// }

 cartData[itemId][size] = quantity;



  await UserModel.findByIdAndUpdate(userId,{cartData})
          res.json({success:true,message:" Card Updated"})
}
catch(error){
   console.log(error)
            res.json({success:false , message:error.message})
}
}



//get  Product to User Cart

const getUserCart=async(req,res)=>{

try{
  const{userId}=req.body;
const userData= await UserModel.findById(userId)

// if (!userData) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

    const cartData= userData.cartData;

  res.json({success:true,cartData});

}
catch(error){
   console.log(error)
            res.json({success:false , message:error.message})
}

}


export{addToCart,updateCart,getUserCart};




// import UserModel from "../models/userModel.js";

// // Add Product to User Cart
// const addToCart = async (req, res) => {
//   try {
//     const { itemId, size } = req.body;

//     const userId = req.userId; // ✅ from token

//     const userData = await UserModel.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     let cartData = userData.cartData || {};

//     if (!cartData[itemId]) {
//       cartData[itemId] = {};
//     }

//     if (cartData[itemId][size]) {
//       cartData[itemId][size] += 1;
//     } else {
//       cartData[itemId][size] = 1;
//     }

//     userData.cartData = cartData;
//     await userData.save();

//     res.json({ success: true, message: "Added to Cart" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // Update User Cart
// const updateCart = async (req, res) => {
//   try {
//     const { itemId, size, quantity } = req.body;

//     const userId = req.userId; // ✅ from token

//     const userData = await UserModel.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     let cartData = userData.cartData || {};

//     if (!cartData[itemId]) {
//       cartData[itemId] = {};
//     }

//     cartData[itemId][size] = quantity;

//     userData.cartData = cartData;
//     await userData.save();

//     res.json({ success: true, message: "Cart Updated" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // Get User Cart
// const getUserCart = async (req, res) => {
//   try {
//     const userId = req.userId; // ✅ from token

//     const userData = await UserModel.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({
//       success: true,
//       cartData: userData.cartData || {}
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { addToCart, updateCart, getUserCart };
