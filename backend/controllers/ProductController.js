import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import productModel from "../models/productModel.js";
  



// function for product
 const addProduct= async (req,res)=>{
  try{
   const {name,description ,price,category,subCategory,sizes,bestseller}= req.body;

   const image1=req.files.image1 && req.files.image1[0]
   const image2=req.files.image2 && req.files.image2[0]
   const image3=req.files.image3 && req.files.image3[0]
   const image4=req.files.image4 && req.files.image4[0]

   const images=[image1,image2,image3,image4].filter((item)=> item !== undefined)
   
   let imageUrls= await Promise.all(
    images.map(async (image)=>{
      let result = await cloudinary.uploader.upload(image.path,{ resource_type:"image"})
      fs.unlinkSync(image.path);
       return  result.secure_url;
    })
   )


   const ProductData= {
    name,
    description,
    price,
    category,
    subCategory,
     sizes: JSON.parse(sizes),
    //sizes: sizes,

    bestseller: bestseller === "true" ? true : false,
    image: imageUrls,
    date: Date.now()
   }



   console.log(ProductData)
   
  const product= new productModel(ProductData)
   await product.save();
     console.log(name,description ,price,category,subCategory,sizes,bestseller)
  console.log(imageUrls)
 

 res.json({success:true,message:"Product added successfully"})

  }catch(error) {
 console.log({error})
    res.json({success:false,message:error.message})

  }
  }
// function for list product
 const listProduct= async (req,res)=>{
try{
  const products= (await productModel.find({}))
res.json({success:true,products})
}catch(error){
   console.log(error)
   res.json({success:false,message:error.message})
}
}
 

//function for remove product
 
// const removeProduct = async (req,res)=>{
//   try{
//      await productModel.findByIdAndDelete(req.body._id)
//      res.json({success : true, message: "product removed successfully"})
//   }
// catch(error){
//   console.log(error)
//   res.json({success:false,message:error.message})
// }

// }

// const removeProduct = async (req, res) => {
//   try {

//     console.log("Delete Body:", req.body); // 👈 Debug

//     const { _id } = req.body;

//     if (!_id) {
//       return res.json({
//         success: false,
//         message: "Product ID not received"
//       });
//     }

//     const deleted = await productModel.findByIdAndDelete(_id);

//     if (!deleted) {
//       return res.json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Product removed successfully"
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };

const removeProduct = async (req, res) => {
  try {

    console.log("Delete Body:", req.body);

    // 👇 id OR _id dono accept karega
    const id = req.body._id || req.body.id;

    if (!id) {
      return res.json({
        success: false,
        message: "Product ID not received"
      });
    }

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product removed successfully"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};



// //function for single product 


//  const singleProduct= async (req,res)=>{
//  try{
//   const {productId}= req.body;
//   const product= await productModel.findById(productId)
//   res.json({success:true,product})
//  }
//   catch(error){
//     console.log(error)
//     res.json({success:false,message:error.message})
//   }


//  }


// const singleProduct = async (req, res) => {
//   try {

//     console.log("Single API Hit"); // 👈 check
//     console.log("Body:", req.body); // 👈 check

//     const { productId } = req.body;

//     if (!productId) {
//       return res.json({
//         success: false,
//         message: "Product ID not received"
//       });
//     }

//     console.log("Searching ID:", productId); // 👈 check

//     const product = await productModel.findById(productId);

//     console.log("Found Product:", product); // 👈 check

//     if (!product) {
//       return res.json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.json({
//       success: true,
//       product
//     });

//   } catch (error) {
//     console.log("Error:", error);

//     res.json({
//       success: false,
//       message: error.message
//     });
//   }
// };


const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.json({ success: false, message: "Product ID not provided" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


 export {listProduct,addProduct,removeProduct,singleProduct};



  