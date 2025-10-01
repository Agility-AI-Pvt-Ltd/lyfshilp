// src/controllers/courseController.js
import prisma from "../prismaClient.js";

/**
 * GET /api/courses
 */
export async function listCourses(req, res) {
  const courses = await prisma.course.findMany({
    include: { tests: { select: { id: true, title: true, maxScore: true } } }
  });
  res.json({ data: courses });
}

/**
 * GET /api/courses/:id
 */
export async function getCourse(req, res) {
  const id = Number(req.params.id);
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      tests: true,
      enrollments: { include: { user: { select: { id: true, name: true, email: true } } } }
    }
  });
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json({ data: course });
}

/**
 * POST /api/courses/:id/enroll
 */
export async function enrollInCourse(req, res) {
  const courseId = Number(req.params.id);
  const userId = req.user.id;

  // Check course exists
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return res.status(404).json({ error: "Course not found" });

  // Try create enrollment unique constraint handles duplicates
  try {
    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId }
    });
    res.json({ success: true, enrollment });
  } catch (err) {
    // Unique constraint violation
    return res.status(400).json({ error: "Already enrolled or cannot enroll" });
  }
}

/**
 * GET courses/api/dashboard (user protected)
 * Provide simple aggregation: enrolled courses count, test submissions and average score
 */
export async function getDashboard(req, res) {
  const userId = req.user.id;

  const enrollCount = await prisma.enrollment.count({ where: { userId } });

  const submissions = await prisma.testSubmission.findMany({
    where: { userId },
    include: { test: { select: { id: true, title: true, maxScore: true } } },
    orderBy: { submittedAt: "desc" },
    take: 50
  });

  // compute simple score trend
  const scoreTrend = submissions.map((s) => ({
    testId: s.testId,
    testTitle: s.test?.title || "Test",
    score: s.score ?? 0,
    date: s.submittedAt
  })).reverse();

  res.json({
    enrolledCourses: enrollCount,
    submissions,
    scoreTrend
  });
}
