import mongoose, { mongo } from "mongoose"

const LikeSchema=new mongoose.Schema({
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    ,
    // either a tweet or a comment
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
        default:null
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        default:null

    }


})

LikeSchema.index({user:1,tweet:1},{unique:true,partialFilterExpression:{tweet:{$type:'objectId'}}})
LikeSchema.index({user:1,comment:1},{unique:true,partialFilterExpression:{comment:{$type:'objectId'}}})


const Like= mongoose.models.Like || mongoose.model("Like",LikeSchema)

export default Like;
