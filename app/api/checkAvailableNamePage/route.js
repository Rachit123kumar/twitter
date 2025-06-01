import Community from "../../_models/communities";
import db from "../../_features/utils/db";
import { NextResponse } from "next/server";

export async function POST(req){
    const body=await req.json();
    try{
        const {name}=body;

        await db.connectDb()

        const isThere=await Community.findOne({
            name:name
        })

        if(isThere){
            return NextResponse.json({
                message:"Not available",
                available:false,
                isThere
            })
        }else{
            return NextResponse.json({
                message:"avaialble",
                available:true
            })
        }

    }catch(err){

        console.log(err)
        return NextResponse.json({
            message:err.message||"server error",
            status:400
        })
    }



}