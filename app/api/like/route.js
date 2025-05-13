import Like from "../../_models/like.js";
import db from "../../_features/utils/db.js";
import { NextRequest, NextResponse } from "next/server";
import User from "../../_models/user.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { tweetId, email } = body;
    console.log("Tweet:", tweetId, "Email:", email);

    await db.connectDb();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    const isLiked = await Like.findOne({
      user: userId,
      tweet: tweetId,
    });

    if (isLiked) {
      return NextResponse.json({
        message: "Already liked.",
      });
    }

    await Like.create({
      user: userId,
      tweet: tweetId,
    });

    return NextResponse.json({
      message: "You liked the tweet.",
    });

  } catch (err) {
    console.error("LIKE error:", err);
    return NextResponse.json({
      message: "Something went wrong.",
    }, { status: 500 });
  }
}
