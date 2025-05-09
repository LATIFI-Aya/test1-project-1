import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profileImagePath:{type:String, default:""},
    tripList:{type:Array, default:[]},
    wishList:{type:Array, default:[]},
    propertyList:{type:Array, default:[]},
    reservationList :{type:Array, default:[]},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
}, {timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;