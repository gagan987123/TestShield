// models/UserTest.js
const mongoose = require("mongoose");

const userTestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Test",
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test.questions",
      },
      answer: String,
      isCorrect: Boolean,
    },
  ],
  score: Number,
  startedAt: Date,
  submittedAt: Date,
});

module.exports = mongoose.model("UserTest", userTestSchema);
