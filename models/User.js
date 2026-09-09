const mongoose = require("mongoose");

const chapterProgressSchema = new mongoose.Schema(
  {
    contentRead: { type: Boolean, default: false },
    quizCompleted: { type: Boolean, default: false },
    quizScore: { type: Number, default: null },
    answers: { type: [Number], default: [] },
    completedAt: { type: Date, default: null }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    progress: {
      activeChapter: { type: Number, default: 1 },
      activeView: { type: String, default: "dashboard" },
      activeTrackId: { type: String, default: "all" },
      chapters: {
        type: Map,
        of: chapterProgressSchema,
        default: {}
      },
      streak: { type: Number, default: 1 },
      lastActiveDate: { type: Date, default: Date.now }
    }
  },
  {
    timestamps: true
  }
);

// Prevent mongoose from compiling model repeatedly across hot reloads or serverless invocations
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
