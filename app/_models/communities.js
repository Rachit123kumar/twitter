import mongoose from "mongoose";


const communitySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,


    },
    coverPhoto:{
        type:String,
        required:true
    },
    backgroundPhoto:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    bio:{
        type:String,
        required:true
    },
    category:{
        type:String,
        
    },
    privacy:{
        type:String,
        enum:["public","private"],
        default:"public"
    },
    rules:{
        type:[String],
        default:[]
    },
    moderator:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ]
 
})

const Community=mongoose.models.Community ||  mongoose.model("Community",communitySchema);
export  default Community