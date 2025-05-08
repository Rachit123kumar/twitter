import { NextRequest, NextResponse } from "next/server";
import db from "../../_features/utils/db";
import Tweet from "../../_models/tweet";

export async function GET(){


 db.connectDb()

const allpost=await Tweet.find()
.populate("author","name image")



  return  NextResponse.json(allpost)

}