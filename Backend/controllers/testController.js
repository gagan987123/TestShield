const Test = require("../models/Test");
const UserTest = require("../models/UserTest");

exports.postTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json({ message: "Test created successfully", test });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ error: "Failed to create test" });
  }
};

exports.AddQues = async (req, res) => {
  try {
    const { testid } = req.params;
    const question = req.body;

    const test = await Test.findById(testid);
    if (!test) return res.status(404).json({ message: "Test not found" });

    test.questions.push(question);
    await test.save();

    res.status(201).json({ message: "Question added successfully", test });
  } catch (error) {
    console.error("AddQues error:", error);
    res.status(500).json({ message: "Error adding question" });
  }
};

exports.RmvQues = async (req, res) => {
  try {
    const { testid } = req.params;
    const { questionId } = req.body;

    const test = await Test.findById(testid);
    if (!test) return res.status(404).json({ message: "Test not found" });

    test.questions = test.questions.filter(
      (q) => q._id.toString() !== questionId
    );
    await test.save();

    res.status(200).json({ message: "Question removed successfully", test });
  } catch (error) {
    console.error("RmvQues error:", error);
    res.status(500).json({ message: "Error removing question" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { testid, questionId } = req.params;
    const updatedData = req.body;

    const test = await Test.findById(testid);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const question = test.questions.id(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    Object.assign(question, updatedData); // Update only provided fields
    await test.save();

    res.status(200).json({ message: "Question updated successfully", test });
  } catch (error) {
    console.error("updateQuestion error:", error);
    res.status(500).json({ message: "Error updating question" });
  }
};

exports.publishTest = async (req, res) => {
  const { testid } = req.params;
  const { published, startTime, endTime } = req.body;

  try {
    const test = await Test.findByIdAndUpdate(
      testid,
      { published, startTime, endTime },
      { new: true }
    );
    res.status(200).json({ message: "Test publish status updated", test });
  } catch (error) {
    res.status(500).json({ message: "Error updating publish status" });
  }
};

exports.submitTest = async (req, res) => {
  const userId = req.user._id;
  const { testId, responses, startedAt } = req.body;
  const submittedAt = new Date();

  try {
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const startTime = new Date(test.startTime);
    const endTime = new Date(test.endTime);
    if (new Date(startedAt) < startTime) {
      return res.status(400).json({ message: "Test not started yet" });
    }

    if (new Date(startedAt) > endTime) {
      return res.status(400).json({ message: "Test time has expired" });
    }

    let score = 0;

    const evaluatedResponses = test.questions.map((question) => {
      const userResponse = responses.find(
        (r) => r.questionId === question._id.toString()
      );

      const isCorrect =
        question.type === "mcq"
          ? userResponse?.answer === question.correctAnswer
          : undefined;

      if (isCorrect) score += 1;

      return {
        questionId: question._id,
        answer: userResponse?.answer || "",
        isCorrect,
      };
    });

    const result = await UserTest.create({
      userId,
      testId,
      responses: evaluatedResponses,
      score,
      startedAt,
      submittedAt,
    });

    res.status(200).json({ message: "Test submitted", result });
  } catch (error) {
    res.status(500).json({ message: "Error submitting test", error });
  }
};
