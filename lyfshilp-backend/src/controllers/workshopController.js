import prisma from "../prismaClient.js";
import { sendMailToAdmins, sendMailToUser } from "../utils/sendMail.js";

/**
 * POST /workshop/register
 * Public: Register for a Workshop
 */
export const registerWorkshop = async (req, res) => {
  try {
    const { name, phone, email, organization, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, message: "Name, phone, and email are required" });
    }

    const workshop = await prisma.workshop.create({
      data: { name, phone, email, organization, message },
    });
      await sendMailToUser({
          email,
          name,
          formName: "Olympiad Registration",
        });
      
        await sendMailToAdmins({
          formName: "Olympiad Registration",
          name,
          email,
          formData: req.body,
          meta: {
            path: req.originalUrl,
            userAgent: req.headers["user-agent"],
            submittedAt: new Date(),
          },
        });

    res.status(201).json({ success: true, data: workshop });
  } catch (error) {
    console.error("Error registering workshop:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /workshop/all
 * Admin: Get all Workshop registrations
 */
export const getAllWorkshopRegistrations = async (req, res) => {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: workshops });
  } catch (error) {
    console.error("Error fetching workshops:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * POST /workshop/add
 * Admin: Add a new Workshop entry manually
 */
export const addWorkshopEntry = async (req, res) => {
  try {
    const { name, phone, email, organization, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, message: "Name, phone, and email are required" });
    }

    const newWorkshop = await prisma.workshop.create({
      data: { name, phone, email, organization, message },
    });

    res.status(201).json({ success: true, data: newWorkshop });
  } catch (error) {
    console.error("Error adding workshop entry:", error);
    res.status(500).json({ success: false, message: "Error adding workshop entry" });
  }
};

/**
 * PUT /workshop/update/:id
 * Admin: Update Workshop entry
 */
export const updateWorkshopEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedWorkshop = await prisma.workshop.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.json({ success: true, data: updatedWorkshop });
  } catch (error) {
    console.error("Error updating workshop:", error);
    res.status(500).json({ success: false, message: "Error updating workshop entry" });
  }
};

/**
 * DELETE /workshop/delete/:id
 * Admin: Delete Workshop entry
 */
export const deleteWorkshopEntry = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.workshop.delete({
      where: { id: parseInt(id) },
    });

    res.json({ success: true, message: "Workshop entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    res.status(500).json({ success: false, message: "Error deleting workshop entry" });
  }
};
