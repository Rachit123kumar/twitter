import { NextResponse } from "next/server";
import mongoose from "mongoose";
import db from "../../_features/utils/db";
import Tweet from "../../_models/tweet";
import User from "../../_models/user";

export async function POST(req) {
  try {
    await db.connectDb();

    const body = await req.json();
    const { postId, email } = body;

    if (!postId || !email) {
      return NextResponse.json({ message: "Post ID and email required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    const result = await Tweet.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(postId) }
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author"
        }
      },
      { $unwind: "$author" },
      {
        $lookup: {
          from: "comments",
          let: { tweetId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$tweet", "$$tweetId"] } } },
            {
              $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author"
              }
            },
            { $unwind: "$author" }
          ],
          as: "comments"
        }
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" }
        }
      },
      {
        $lookup: {
          from: "likes",
          let: { tweetId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$tweet", "$$tweetId"] } } },
          ],
          as: "likes"
        }
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
          isLikedByMe: {
            $in: [userId, "$likes.user"]
          }
        }
      },
      {
        $project: {
          content: 1,
          kind: 1,
          media: 1,
          poll: 1,
          hastags: 1,
          createdAt: 1,
          author: {
            name: 1,
            email: 1,
            username: 1,
            image: 1
          },
          comments: 1,
          commentCount: 1,
          likeCount: 1,
          isLikedByMe: 1
        }
      }
    ]);

    if (!result || result.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);

  } catch (err) {
    console.error("Error in aggregation:", err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
