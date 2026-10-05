import express from 'express';
import {
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
	resetUserPassword
} from '../controllers/userController.js'
import authUser from '../middleware/auth.js'

 const userRouter= express.Router();
 userRouter.post('/register',registerUser)
 userRouter.post('/login',loginUser)
 userRouter.post('/forgot-password',requestPasswordReset)
 userRouter.post('/reset-password',resetUserPassword)
 userRouter.post('/admin',adminLogin)
 userRouter.get('/wishlist',authUser,getUserWishlist)
 userRouter.put('/wishlist',authUser,updateUserWishlist)
 userRouter.get('/addresses',authUser,getUserAddresses)
 userRouter.post('/addresses',authUser,addUserAddress)
 userRouter.put('/addresses',authUser,updateUserAddress)
 userRouter.delete('/addresses',authUser,deleteUserAddress)
 userRouter.put('/password',authUser,changeUserPassword)
 userRouter.post('/profile',authUser,getUserProfile)
 userRouter.put('/profile',authUser,updateUserProfile)
 
 export default  userRouter;