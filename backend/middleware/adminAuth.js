// import jwt from 'jsonwebtoken';
// const adminAuth =(req,res,next)=>{
//     try {
//         const {token} = req.headers;
//         if(!token){
//             return res.json({success:false,message:"Not Authorized, Please Login Again"})
//         }
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.json({success:false,message:"Not Authorized, Please Login Again"})
//         }
//         next();
//     }
//     catch(error){
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }
//  export default adminAuth;



// import jwt from "jsonwebtoken";

// const adminAuth = (req, res, next) => {
//   try {

//     // 1. Get header
//     const authHeader = req.headers.authorization;

//     // 2. Check token exists
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Not Authorized, Please Login Again",
//       });
//     }

//     // 3. Extract token
//     const token = authHeader.split(" ")[1];

//     // 4. Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 5. Check admin role
//     if (!decoded || decoded.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Admin Access Denied",
//       });
//     }

//     // 6. Save admin info (optional)
//     req.admin = decoded;

//     // 7. Continue
//     next();

//   } catch (error) {
//     console.log("Auth Error:", error.message);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or Expired Token",
//     });
//   }
// };

// export default adminAuth;




import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {

  try {

    // Header se token lena
    const authHeader = req.headers.authorization;

    // Check: token hai ya nahi
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    // "Bearer token" se sirf token nikalna
    const token = authHeader.split(" ")[1];

    // Check: token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found"
      });
    }

    // Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check: admin hai ya nahi
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin Allowed"
      });
    }

    // Admin data save karna
    req.admin = decoded;

    // Aage route par bhejna
    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token"
    });

  }
};

export default adminAuth;
