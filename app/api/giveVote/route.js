import db from "../../_features/utils/db";
import User from "../../_models/user";
import { NextResponse } from "next/server";
import PollVote from "../../_models/PollVote";

export async function POST(req) {
  await db.connectDb();
  const body = await req.json();

  try {
    const { email, tweetId, optionIndex } = body;
    console.log(email, tweetId, optionIndex)
    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ message: "no user" });

    // Prevent duplicate vote
    const existingVote = await PollVote.findOne({
      Tweet: tweetId,
      user: user._id,
    });

    if (existingVote) {
      return NextResponse.json({ message: "already voted" }, { status: 400 });
    }

    // Create new vote
    await PollVote.create({
      Tweet: tweetId,
      user: user._id,
      optionIndex,
    });

    // Get all votes for this tweet
    const allVotes = await PollVote.find({ Tweet: tweetId });

    const totalVotes = allVotes.length;

    // Calculate vote count per option
    const voteCountMap = {};

    allVotes.forEach((vote) => {
      const idx = vote.optionIndex;
      voteCountMap[idx] = (voteCountMap[idx] || 0) + 1;
    });

    // Convert to array
    const updatedResult = Object.keys(voteCountMap).map((key) => {
      const count = voteCountMap[key];
      return {
        optionIndex: parseInt(key),
        voteCount: count,
        percentage: Math.round((count / totalVotes) * 100),
      };
    });

    return NextResponse.json({
      message: "vote recorded",
      updatedResult,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}
