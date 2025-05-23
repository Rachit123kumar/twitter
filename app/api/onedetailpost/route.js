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
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },

      // Fetch author info
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },

      // Poll vote counts per option
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

      // Get total votes and who voted
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
          totalVotes: "$pollStats.totalVotes",
          hasVoted: { $in: [userId, "$pollStats.votedUsers"] },
        },
      },

      // Calculate percentage per option
      {
        $addFields: {
          pollResults: {
            $map: {
              input: { $range: [0, { $size: "$poll.options" }] },
              as: "index",
              in: {
                optionIndex: "$$index",
                voteCount: {
                  $let: {
                    vars: {
                      matchedOption: {
                        $first: {
                          $filter: {
                            input: "$optionVotes",
                            cond: { $eq: ["$$this._id", "$$index"] },
                          },
                        },
                      },
                    },
                    in: { $ifNull: ["$$matchedOption.count", 0] },
                  },
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

      // Comments
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
                as: "author",
              },
            },
            { $unwind: "$author" },
          ],
          as: "comments",
        },
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" },
        },
      },

      // Likes
      {
        $lookup: {
          from: "likes",
          let: { tweetId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$tweet", "$$tweetId"] } } },
          ],
          as: "likes",
        },
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
          isLikedByMe: { $in: [userId, "$likes.user"] },
        },
      },

      // Final projection
      {
        $project: {
          content: 1,
          kind: 1,
          media: 1,
          poll: 1,
          hastags: 1,
          createdAt: 1,
          author: {
            displayName: 1,
            email: 1,
            userName: 1,
            profilePic: 1,
          },
          comments: 1,
          commentCount: 1,
          likeCount: 1,
          isLikedByMe: 1,
          hasVoted: 1,
          pollResults: 1,
          totalVotes: 1,
        },
      },
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
