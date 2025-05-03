const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["mcq", "coding"],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: String,
  input: String,
  expectedOutput: String,
  languageId: Number,
});

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    questions: [questionSchema],
    published: {
      type: Boolean,
      default: false,
    },
    startTime: Date,
    endTime: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);
