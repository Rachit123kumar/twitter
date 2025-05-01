import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  media: [
    {
      url: { type: String },
      type: { type: String, enum: ["image", "video"] },
    },
  ],
  poll: {
    Question: {
      type: String,
      required: true,
    },
    options: [
      {
        text: { type: String, required: true },
      },
    ],
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  hastags:[{type:String}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tweet =
  mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);

export default Tweet;
