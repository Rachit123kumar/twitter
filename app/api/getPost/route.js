import { NextResponse } from "next/server";
import db from "../../_features/utils/db";
import mongoose from "mongoose";
import User from "../../_models/user";
import Tweet from "../../_models/tweet";

export async function GET(req) {
  try {
    await db.connectDb();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = new mongoose.Types.ObjectId(user._id.toString());

    const tweets = await Tweet.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },

      // Count Likes
      {
        $lookup: {
          from: "likes",
          let: { tweetId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$tweet", "$$tweetId"] } } },
            { $count: "count" },
          ],
          as: "likesInfo",
        },
      },
      {
        $addFields: {
          likeCount: { $ifNull: [{ $arrayElemAt: ["$likesInfo.count", 0] }, 0] },
        },
      },

      // Count Comments
      {
        $lookup: {
          from: "comments",
          let: { tweetId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$tweet", "$$tweetId"] } } },
            { $count: "count" },
          ],
          as: "commentsInfo",
        },
      },
      {
        $addFields: {
          commentCount: { $ifNull: [{ $arrayElemAt: ["$commentsInfo.count", 0] }, 0] },
        },
      },

      // Check if Liked by Me
      {
        $lookup: {
          from: "likes",
          let: { tweetId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$tweet", "$$tweetId"] },
                    { $eq: ["$user", userId] },
                  ],
                },
              },
            },
            { $limit: 1 },
          ],
          as: "likedByMe",
        },
      },
      {
        $addFields: {
          isLikedByMe: { $gt: [{ $size: "$likedByMe" }, 0] },
        },
      },

      // Poll Stats (Votes Per Option)
      {
        $lookup: {
          from: "pollvotes",
          let: { tweetId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$Tweet", "$$tweetId"] } } },
            {
              $group: {
                _id: "$optionIndex",
                count: { $sum: 1 },
              },
            },
          ],
          as: "optionVotes",
        },
      },
      {
        $lookup: {
          from: "pollvotes",
          let: { tweetId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$Tweet", "$$tweetId"] } } },
            {
              $group: {
                _id: null,
                totalVotes: { $sum: 1 },
                votedUsers: { $addToSet: "$user" },
              },
            },
          ],
          as: "pollStats",
        },
      },
      {
        $addFields: {
          pollStats: {
            $ifNull: [{ $arrayElemAt: ["$pollStats", 0] }, { totalVotes: 0, votedUsers: [] }],
          },
        },
      },
      {
        $addFields: {
          totalVotes: {
            $cond: [{ $eq: ["$kind", "POLL"] }, "$pollStats.totalVotes", 0],
          },
          hasVoted: {
            $cond: [
              { $eq: ["$kind", "POLL"] },
              { $in: [userId, "$pollStats.votedUsers"] },
              false,
            ],
          },
          pollResults: {
            $map: {
              input: { $range: [0, { $size: "$poll.options" }] },
              as: "index",
              in: {
                optionIndex: "$$index",
                voteCount: {
                  $ifNull: [
                    {
                      $let: {
                        vars: {
                          voteObj: {
                            $first: {
                              $filter: {
                                input: "$optionVotes",
                                cond: { $eq: ["$$this._id", "$$index"] },
                              },
                            },
                          },
                        },
                        in: "$$voteObj.count",
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          pollResults: {
            $map: {
              input: "$pollResults",
              as: "r",
              in: {
                optionIndex: "$$r.optionIndex",
                voteCount: "$$r.voteCount",
                percentage: {
                  $cond: [
                    { $eq: ["$totalVotes", 0] },
                    0,
                    {
                      $round: [
                        {
                          $multiply: [
                            { $divide: ["$$r.voteCount", "$totalVotes"] },
                            100,
                          ],
                        },
                        1,
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },

      // Cleanup
      {
        $project: {
          likesInfo: 0,
          commentsInfo: 0,
          likedByMe: 0,
          optionVotes: 0,
          pollStats: 0,
        },
      },

      { $sort: { createdAt: -1 } },
    ]);

    return NextResponse.json(tweets);
  } catch (err) {
    console.error("GET /api/tweets error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
