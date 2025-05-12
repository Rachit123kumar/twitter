import { NextResponse } from "next/server";
import db from "../../_features/utils/db";
import User from "../../_models/user";

export async function POST(req){

    await db.connectDb()
    const body=await req.json();

    try{
        const {tweetId,email}=body;

        const user=await User.find({
            email
        })

        const userId=user._id;

        

    }catch(err){
        return NextResponse.json({
            message:"sorry error while voted"
        })

    }





    
}