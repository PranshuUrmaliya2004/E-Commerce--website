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
import { createHash, randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

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

const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId).select("name email");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });

    const user = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { name },
      { new: true, runValidators: true }
    ).select("name email");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId).select("wishlist");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({ success: true, wishlist: user.wishlist.map((id) => id.toString()) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not load wishlist" });
  }
};

const updateUserWishlist = async (req, res) => {
  try {
    const productIds = req.body.productIds;
    if (!Array.isArray(productIds) || productIds.length > 100) {
      return res.status(400).json({ success: false, message: "Wishlist must contain up to 100 product IDs" });
    }

    const uniqueIds = [...new Set(productIds)];
    if (uniqueIds.some((id) => typeof id !== "string" || !mongoose.isValidObjectId(id))) {
      return res.status(400).json({ success: false, message: "Wishlist contains an invalid product ID" });
    }

    const existingCount = await productModel.countDocuments({ _id: { $in: uniqueIds } });
    if (existingCount !== uniqueIds.length) {
      return res.status(400).json({ success: false, message: "Wishlist contains a product that no longer exists" });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { wishlist: uniqueIds },
      { new: true, runValidators: true }
    ).select("wishlist");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({ success: true, wishlist: user.wishlist.map((id) => id.toString()) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not update wishlist" });
  }
};

const normalizeAddress = (address = {}) => ({
  label: typeof address.label === "string" ? address.label.trim().slice(0, 40) : "Home",
  firstName: typeof address.firstName === "string" ? address.firstName.trim() : "",
  lastName: typeof address.lastName === "string" ? address.lastName.trim() : "",
  email: typeof address.email === "string" ? address.email.trim().toLowerCase() : "",
  street: typeof address.street === "string" ? address.street.trim() : "",
  city: typeof address.city === "string" ? address.city.trim() : "",
  state: typeof address.state === "string" ? address.state.trim() : "",
  zipcode: typeof address.zipcode === "string" ? address.zipcode.trim() : "",
  country: typeof address.country === "string" ? address.country.trim() : "",
  phone: typeof address.phone === "string" ? address.phone.trim() : ""
});

const validateAddress = (address) => (
  [address.firstName, address.lastName, address.street, address.city, address.state, address.zipcode, address.country, address.phone]
    .every((value) => value.length > 0)
);

const getUserAddresses = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId).select("addresses");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not load addresses" });
  }
};

const addUserAddress = async (req, res) => {
  try {
    const address = normalizeAddress(req.body.address);
    if (!validateAddress(address)) {
      return res.status(400).json({ success: false, message: "Complete all required address fields" });
    }

    const user = await UserModel.findById(req.body.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.addresses.length >= 10) {
      return res.status(400).json({ success: false, message: "You can save up to 10 addresses" });
    }

    const isDefault = req.body.isDefault === true || user.addresses.length === 0;
    if (isDefault) user.addresses.forEach((savedAddress) => { savedAddress.isDefault = false; });
    user.addresses.push({ ...address, isDefault });
    await user.save();
    return res.status(201).json({ success: true, addresses: user.addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not save address" });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const addressId = req.body.addressId;
    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(400).json({ success: false, message: "Invalid address ID" });
    }

    const address = normalizeAddress(req.body.address);
    if (!validateAddress(address)) {
      return res.status(400).json({ success: false, message: "Complete all required address fields" });
    }

    const user = await UserModel.findById(req.body.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const savedAddress = user.addresses.id(addressId);
    if (!savedAddress) return res.status(404).json({ success: false, message: "Address not found" });

    const setDefault = req.body.isDefault === true;
    if (setDefault) user.addresses.forEach((item) => { item.isDefault = false; });
    Object.assign(savedAddress, address);
    if (setDefault) savedAddress.isDefault = true;
    await user.save();
    return res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not update address" });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const addressId = req.body.addressId;
    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(400).json({ success: false, message: "Invalid address ID" });
    }

    const user = await UserModel.findById(req.body.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });
    const wasDefault = address.isDefault;
    address.deleteOne();
    if (wasDefault && user.addresses.length > 0) user.addresses[0].isDefault = true;
    await user.save();
    return res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not delete address" });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (typeof currentPassword !== "string" || typeof newPassword !== "string" || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Enter your current password and a new password of at least 8 characters" });
    }

    const user = await UserModel.findById(req.body.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!await bcrypt.compare(currentPassword, user.password)) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not update password" });
  }
};

const requestPasswordReset = async (req, res) => {
  const genericResponse = {
    success: true,
    message: "If an account exists for that email, a password reset link has been sent."
  };

  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    if (!validator.isEmail(email)) return res.json(genericResponse);

    const user = await UserModel.findOne({ email });
    if (!user) return res.json(genericResponse);

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    if (!smtpHost || !smtpUser || !smtpPassword || !smtpFrom) {
      console.error("Password reset email is unavailable: SMTP environment is not configured");
      return res.json(genericResponse);
    }

    const resetToken = randomBytes(32).toString("hex");
    user.passwordResetTokenHash = createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: port === 465,
      auth: { user: smtpUser, pass: smtpPassword }
    });
    const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
    const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(resetToken)}`;

    try {
      await transporter.sendMail({
        from: smtpFrom,
        to: user.email,
        subject: "Reset your ShopNex password",
        text: `Use this link within 15 minutes to reset your password: ${resetUrl}`,
        html: `<p>We received a request to reset your ShopNex password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 15 minutes. If you did not request this, you can ignore this email.</p>`
      });
    } catch (mailError) {
      user.passwordResetTokenHash = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      console.error("Could not send password reset email:", mailError.message);
    }

    return res.json(genericResponse);
  } catch (error) {
    console.error("Password reset request failed:", error.message);
    return res.json(genericResponse);
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (typeof token !== "string" || token.length !== 64 || typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ success: false, message: "Reset link or password is invalid" });
    }

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const user = await UserModel.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpires: { $gt: new Date() }
    }).select("+passwordResetTokenHash +passwordResetExpires");

    if (!user) {
      return res.status(400).json({ success: false, message: "This reset link is invalid or has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.json({ success: true, message: "Password reset successfully. You can now sign in." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not reset password" });
  }
};

/* ===============================
   EXPORT
================================*/
export {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  getUserWishlist,
  updateUserWishlist,
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  changeUserPassword,
  requestPasswordReset,
  resetUserPassword,
};













