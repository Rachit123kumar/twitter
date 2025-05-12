import { NextResponse } from "next/server";
import db from "../../_features/utils/db";
import Tweet from "../../_models/tweet";
import Comment from "../../_models/comment";
import Like from "../../_models/like";

export async function POST(req){
    try{

        await db.connectDb()
        const body=await req.json();
        const {postId}=body
        const post =await Tweet.findOne({
            _id:postId
        })
        .populate("author","image name  email username")

        const comments=await Comment.find({
            tweet:postId
        })
        const likes=await Like.find({
            tweet:postId

        })
        console.log(comments,likes)




        if(!post){
            return NextResponse.json({
                message:"No post"
            })
        }
        return NextResponse.json(post)


    }catch(err){
return NextResponse.json({
    message:err||"error "
})
    }
}