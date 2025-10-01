import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/testseries
 * Fetch all test series
 */
export const getTestSeries = async (req, res) => {
  try {
    const series = await prisma.testSeries.findMany({
      orderBy: { date: "desc" },
    });
    res.json(series);
  } catch (error) {
    console.error("Error fetching test series:", error);
    res.status(500).json({ error: "Failed to fetch test series" });
  }
};

/**
 * POST /api/testseries
 * Create a new test series
 */
export const createTestSeries = async (req, res) => {
  try {
    const { title, description, totalTests, date } = req.body;

    if (!title || !description || !totalTests || !date) {
      return res
        .status(400)
        .json({ error: "title, description, totalTests and date are required" });
    }

    const testSeries = await prisma.testSeries.create({
      data: {
        title,
        description,
        totalTests: Number(totalTests),
        date: new Date(date),
      },
    });

    res.status(201).json({
      success: true,
      message: "Test series created successfully",
      testSeries,
    });
  } catch (error) {
    console.error("Error creating test series:", error);
    res.status(500).json({ error: "Failed to create test series" });
  }
};
