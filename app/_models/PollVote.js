import mongoose from "mongoose";

const PollVoteSchema = new mongoose.Schema({
  Tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  optionIndex: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Fix index field name
// PollVote.js
PollVoteSchema.index({ user: 1, Tweet: 1 }, { unique: true }); // ✅ CAPITAL "T" to match schema


const PollVote = mongoose.models.PollVote || mongoose.model("PollVote", PollVoteSchema);
export default PollVote;
