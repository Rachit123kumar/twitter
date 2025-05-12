import Like from "../../_models/like.js";
import db from "../../_features/utils/db.js";
import { NextRequest, NextResponse } from "next/server";
import User from "../../_models/user.js";


export async function POST(req) {

    try {
        const body = await req.json();
        const { tweetId, email } = body;
        console.log(tweetId,email)
        // 681ac72cb1a993a216783dbb hellobittukumar12@gmail.com

        await db.connectDb()

        const user = await User.find({
            email
        })

        const userId = user._id;
        const isLiked = await Like.find({
            user: userId,
           tweet: tweetId

        })
        if (isLiked.length) {
            return NextResponse.json({
                message: "already liked.."
            })
        } else {
            const newLIke = await Like.create({
                user: userId,
                tweet: tweetId
            })

            return NextResponse.json({
                message:"Hey You liked the tweet.. "
            })
        }






       
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            message: "error ...",

        })
    }

}