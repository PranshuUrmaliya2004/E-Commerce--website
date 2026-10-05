import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    label:{type:String, trim:true, default:"Home"},
    firstName:{type:String, trim:true, required:true},
    lastName:{type:String, trim:true, required:true},
    email:{type:String, trim:true, lowercase:true},
    street:{type:String, trim:true, required:true},
    city:{type:String, trim:true, required:true},
    state:{type:String, trim:true, required:true},
    zipcode:{type:String, trim:true, required:true},
    country:{type:String, trim:true, required:true},
    phone:{type:String, trim:true, required:true},
    isDefault:{type:Boolean, default:false}
});

const userSchema= new mongoose.Schema({
    name:{type : String, required:true},
    email:{type : String, required:true,unique:true},
    password:{type : String ,required:true},
    passwordResetTokenHash:{type:String, select:false},
    passwordResetExpires:{type:Date, select:false},
    cartData:{type : Object, default : {}},
    wishlist:{type:[mongoose.Schema.Types.ObjectId], ref:'product', default:[]},
    addresses:{type:[addressSchema], default:[]}
})

 const UserModel = mongoose.models.user || mongoose.model('user',userSchema)
 export default UserModel;