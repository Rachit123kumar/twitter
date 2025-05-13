import db from "../../_features/utils/db";
import { NextResponse } from "next/server";
import Comment from "../../_models/comment";
import User from "../../_models/user";

export async function POST(req) {
    await db.connectDb()
    const body = await req.json();

    const { email, tweetId, content } = body;




    try {

        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return NextResponse.json({
                message: "no user",
                status: 500
            })
        }


        const comment = await Comment.create({
            content,
            tweet: tweetId,
            author: user._id
        })

        return NextResponse.json(comment)

    } catch (err) {
        console.log(err)
        return NextResponse.json({
            message: "Error",
            status: 500
        })
    }
}