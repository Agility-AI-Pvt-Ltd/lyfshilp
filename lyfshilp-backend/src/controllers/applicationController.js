// src/controllers/applicationController.js
import prisma from "../prismaClient.js";

/**
 * 📝 Create Application (Public route)
 */
export const createApplication = async (req, res) => {
  try {
    const { fullName, phone, email, about, resumeUrl, jobId, jobTitle } = req.body;

    const application = await prisma.application.create({
      data: { fullName, phone, email, about, resumeUrl, jobId, jobTitle },
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("❌ Create Application Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * 👑 Get All Applications (Admin only)
 */
export const getAllApplications = async (req, res) => {
  try {
    // ✅ Sirf admin hi access kar sake
    if (!req.user || req.user.role?.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }

    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ applications });
  } catch (err) {
    console.error("❌ Get Applications Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
