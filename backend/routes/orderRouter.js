import express from 'express'
import  {placedOrder,placedStripe,placedPaytm,placedRozarPay,placedPhonepe,allOrder,userOrder,updateStatus, verifyStripe,verifyFakePayment,deleteOrder} from   '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter= express.Router();


// Admin Features

orderRouter.post("/list",adminAuth,allOrder)
orderRouter.post("/status",adminAuth,updateStatus)

//for order delete hstry
orderRouter.post("/delete", adminAuth, deleteOrder);

//Payment features

orderRouter.post("/place",authUser,placedOrder)
orderRouter.post("/stripe",authUser,placedStripe)
orderRouter.post("/razorpay",authUser,placedRozarPay)
orderRouter.post("/paytm",authUser,placedPaytm)
orderRouter.post("/phonepe",authUser,placedPhonepe)


orderRouter.post("/verify-fake", authUser, verifyFakePayment);



//user Features
orderRouter.post("/userorders",authUser,userOrder)

orderRouter.post("/verifyStripe",authUser,verifyStripe)


export default orderRouter;