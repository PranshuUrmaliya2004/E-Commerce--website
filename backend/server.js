import express from 'express' 
import cors from 'cors'
import 'dotenv/config';
import Connectdb from './Config/mongodb.js';
import ConnectCloudinary from './Config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

// App confign
const app = express();
const port = process.env.PORT || 4000;


console.log(process.env.MONGO_URI);
Connectdb();
ConnectCloudinary();

// middleware
app.use(express.json());   // ✅ FIXED
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/',(req,res)=>{
res.send("Api Working")
})
app.listen(port, () => console.log('server Started on port:' + port));
