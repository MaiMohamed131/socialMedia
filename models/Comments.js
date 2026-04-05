import mongoose from 'mongoose';


const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const commentSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },

    text:{
        type:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    },

    replies: [replySchema]

},{timestamps:true})


export default mongoose.model("Comment",commentSchema)