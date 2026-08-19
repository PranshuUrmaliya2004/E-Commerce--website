// import jwt from "jsonwebtoken"

// const authUser= async (req ,res ,next)=>{

// // const token = req.headers;
// const token=req.headers.authorization;


// if(!token){
//     return res.json({success:false,message:"Not Authorized Login Again"})
// }
// try{

//  const token_decode= jwt.verify(token,process.env.JWT_SECRET)
//  req.body.userId=token_decode.id
//  next()
// }

// catch(error){

//     console.log(error)
//     res.json({success:false,message: error.message})
// }
// }



// export default authUser



import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Please login again"
      });
    }

    // "Bearer " remove karo
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    

    req.body.userId = decoded.id;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token"
    });
  }
};

export default authUser;



// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//   try {

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "Please login again"
//       });
//     }

//     // Remove "Bearer "
//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token missing"
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userId = decoded.id;

//     next();

//   } catch (error) {
//     console.log("Auth Error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or Expired Token"
//     });
//   }
// };

// export default authUser;
