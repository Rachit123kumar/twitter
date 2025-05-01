import mongoose from "mongoose";


const PollVoteSchema=new mongoose.Schema({
    Tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    optionIndex:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
PollVoteSchema.index({user:1,tweet:1},{unique:true})
const PollVote=mongoose.model.PollVote || mongoose.model("PollVote",PollVoteSchema)
export default PollVote