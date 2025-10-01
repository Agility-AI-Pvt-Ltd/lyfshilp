// src/controllers/testController.js
import prisma from "../config/prisma.js";

// Submit a test
export const submitTest = async (req, res) => {
  try {
    const { userId, testId, answers } = req.body;

    if (!userId || !testId || !answers) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const submission = await prisma.testSubmission.create({
      data: {
        userId,
        testId,
        answers: answers ? answers : null,
        submittedAt: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Test submitted successfully ✅",
      submission,
    });
  } catch (err) {
    console.error("Error submitting test:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get all submissions for a test
export const getTestSubmissions = async (req, res) => {
  try {
    const { testId } = req.params;

    const submissions = await prisma.testSubmission.findMany({
      where: { testId: Number(testId) },
      include: { user: true },
      orderBy: { submittedAt: "desc" },
    });

    res.json({ success: true, submissions });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
