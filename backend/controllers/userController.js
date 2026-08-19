// import validator from "validator";
// import bcrypt from "bcrypt"; // or "bcrypt"

// import jwt from "jsonwebtoken"
// import UserModel from "../models/userModel.js";

//  const createToken=(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)
//  }


// //Route for loginuser
// const loginUser = async (req,res)=>{
//     try {
//         const{email,password}= req.body
//       const user = await UserModel.findOne({email});

//       if(!user){
//          return res.json({success:false,message:"User does'  exist"});
//       }
//       const isMatch= await bcrypt.compare(password,user.password);
//       if(isMatch){
//          const token = createToken(user._id)
//          res.json({success:true,token})
//       }
//       else {
//         res.json({success:false,message:"invalid credentials"})
//       }
//     }


// catch(error){
//     console.log(error)
//  res.json({success:false,message:error.message})
// }


// }

// //Route for registerUser
// const registerUser = async (req,res)=>{
// try{
//     const{name,email,password}=req.body;


//      // ✅ ADD THIS BLOCK
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, Email, and Password are required",
//       });
//     }
//     // cheaking user are exist are not
//     const exist =await  UserModel.findOne({email})
//     if(exist){
//         return res.json({success:false,message:"User already  exist"});
//     }
//     // validating email format & strong password
//     if(!validator.isEmail(email)){
//         return res.json({success:false,message:"Please enter a valid email"});
//     }
//     if(password.length< 8 ){
//       return res.json({success:false,message:"Please enter a strong Password"});
//     }

//     //hashing user password
//    const salt= await bcrypt.genSalt(10);
//    const hashedPassword=await bcrypt.hash(password,salt);

//     const newUSer= new UserModel({
//         name,
//         email,
//         password :hashedPassword
//     })
//      const user = await newUSer.save();
     
//      const token= createToken(user._id)
//      res.json({success:true,token})
// }

// catch(error){
//    console.log(error)
//    res.json({success:false,message:error.message})
// }
//  }

// // Route for admin login
//  const adminLogin = async (req,res)=>{
    
//   try{
//     const {email,password}=req.body;
//     if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
//       const token = jwt.sign(email+password,process.env.JWT_SECRET);
//       res.json({success:true,token});
//     }
//     else{
//       res.json({success:false,message:"Invalid Admin Credentials"});
// }
//   }
//   catch(error){
//       console.log(error)
//    res.json({success:false,message:error.message})
//   }
//  }


// export {loginUser,registerUser,adminLogin}


// // const adminLogin = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ success: false, message: "Email & Password required" });
// //     }

// //     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
// //       // Create proper token with email in payload
// //       const token = jwt.sign(
// //         { email: process.env.ADMIN_EMAIL },
// //         process.env.JWT_SECRET,
// //         { expiresIn: "1d" }
// //       );
// //       return res.json({ success: true, token });
// //     } else {
// //       return res.json({ success: false, message: "Invalid Admin Credentials" });
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: error.message });
// //   }
// // };





// // Admin Login
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         success: false,
//         message: "Email and Password required",
//       });
//     }

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign(
//         {
//           role: "admin",
//           email: email,
//         },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "1d",
//         }
//       );

//       return res.json({
//         success: true,
//         token,
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "Invalid Admin Credentials",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };



// export {loginUser,registerUser,adminLogin}












import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

/* ===============================
   CREATE TOKEN
================================*/
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // user token valid 7 days
  );
};

/* ===============================
   USER LOGIN
================================*/
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   USER REGISTER
================================*/
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Name, Email and Password required",
      });
    }

    // Check exist
    const exist = await UserModel.findOne({ email });

    if (exist) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
            
    // Save user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   ADMIN LOGIN
================================*/
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password required",
      });
    }

    // Match with .env
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      // Create admin token
      const token = jwt.sign(
        {
          role: "admin",
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.json({
        success: true,
        token,
      });
    }

    return res.json({
      success: false,
      message: "Invalid Admin Credentials",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   EXPORT
================================*/
export {
  loginUser,
  registerUser,
  adminLogin,
};













