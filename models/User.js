import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/12225/12225935.png"
    }
})


export default mongoose.model("User",userSchema)