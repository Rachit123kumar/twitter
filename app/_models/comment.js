import mongoose from "mongoose";

const CommentSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
   tweet:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Tweet',
    required:true
   },
   author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now
   },
   parrentComment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
   }

})
const Comment=mongoose.models.Comment || mongoose.model("Comment",CommentSchema)
export default Comment;