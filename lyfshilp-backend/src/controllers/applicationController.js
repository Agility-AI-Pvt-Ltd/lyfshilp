import prisma from "../prismaClient.js";
import { sendMailToAdmins, sendMailToUser } from "../utils/sendMail.js";

/**
 * 📝 Public: Create new application (Candidate form)
 */
export const createApplication = async (req, res) => {
  try {
    let { fullName, phone, email, about, resumeUrl, jobId, jobTitle } = req.body;

    if (!fullName || !email || !phone || !resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // ✅ Convert jobId to integer if present
    if (jobId) jobId = parseInt(jobId);

    const application = await prisma.application.create({
      data: { fullName, phone, email, about, resumeUrl, jobId, jobTitle },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * 👑 Admin: Get all applications
 */
export const getAllApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ➕ Admin: Add new application manually
 */
export const addApplication = async (req, res) => {
  try {
    let { fullName, phone, email, about, resumeUrl, jobId, jobTitle } = req.body;

    // ✅ Convert jobId to integer if present
    if (jobId) jobId = parseInt(jobId);

    const newApp = await prisma.application.create({
      data: { fullName, phone, email, about, resumeUrl, jobId, jobTitle },
    });

      await sendMailToUser({
          email,
          name,
          formName: "Application Registration",
        });
      
        await sendMailToAdmins({
          formName: "Application Registration",
          name,
          email,
          formData: req.body,
          meta: {
            path: req.originalUrl,
            userAgent: req.headers["user-agent"],
            submittedAt: new Date(),
          },
        });

    res.status(201).json({ success: true, data: newApp });
  } catch (error) {
    console.error("Error adding application:", error);
    res.status(500).json({ success: false, message: "Error adding application" });
  }
};

/**
 * ✏️ Admin: Update existing application
 */
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    // ✅ Convert jobId if present
    if (data.jobId) data.jobId = parseInt(data.jobId);

    const updated = await prisma.application.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ success: false, message: "Error updating application" });
  }
};

/**
 * 🗑️ Admin: Delete application
 */
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.application.delete({
      where: { id: parseInt(id) },
    });

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Application not found or already deleted",
      });
    }

    console.error("Error deleting application:", error);
    res.status(500).json({ success: false, message: "Error deleting application" });
  }
};
