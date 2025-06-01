import Community from "../../_models/communities";
import db from "../../_features/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    await db.connectDb()

    try {
        const { userId, name, category, bio, rules, privacy ,backgroundPhoto,coverPhoto} = body;
        console.log(userId, name, category, bio, rules, privacy, backgroundPhoto, coverPhoto)

        // const community=await Community.create({
        //     name,
        //     coverPhoto,
        //     backgroundPhoto,
        //     owner:userId,
        //     bio,
        //     category,
        //     privacy,
        //     rules



        // })


        // return NextResponse.json(community)
        return NextResponse.json({
            message: "nice"
        })

    } catch (err) {
        console.log(err)

        NextResponse.json({
            message: err.message || "server error",
            status: 400

        })
    }



}