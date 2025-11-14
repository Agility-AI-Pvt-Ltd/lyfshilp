import prisma from "../prismaClient.js";
import { sendMailToAdmins, sendMailToUser } from "../utils/sendMail.js";

/**
 * POST /olympiad/register
 * Public: Register a new student for Olympiad
 */
export const registerOlympiad = async (req, res) => {
  try {
    const { name, email, phone, className, school, city, state, olympiad } = req.body;

    if (!name || !email || !phone || !className || !school || !city || !state || !olympiad) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const registration = await prisma.olympiadRegistration.create({
      data: { name, email, phone, className, school, city, state, olympiad },
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

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    console.error("Error registering Olympiad:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /olympiad/all
 * Admin: Get all Olympiad registrations
 */
export const getAllOlympiadRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.olympiadRegistration.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error("Error fetching Olympiad registrations:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * POST /olympiad/add
 * Admin: Add a new Olympiad entry
 */
export const addOlympiadEntry = async (req, res) => {
  try {
    const { name, email, phone, className, school, city, state, olympiad } = req.body;

    if (!name || !email || !phone || !className || !school || !city || !state || !olympiad) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newEntry = await prisma.olympiadRegistration.create({
      data: { name, email, phone, className, school, city, state, olympiad },
    });

    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    console.error("Error adding Olympiad entry:", error);
    res.status(500).json({ success: false, message: "Error adding entry" });
  }
};

/**
 * PUT /olympiad/update/:id
 * Admin: Update Olympiad entry
 */
export const updateOlympiadEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEntry = await prisma.olympiadRegistration.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.json({ success: true, data: updatedEntry });
  } catch (error) {
    console.error("Error updating Olympiad entry:", error);
    res.status(500).json({ success: false, message: "Error updating entry" });
  }
};

/**
 * DELETE /olympiad/delete/:id
 * Admin: Delete Olympiad entry
 */
export const deleteOlympiadEntry = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.olympiadRegistration.delete({
      where: { id: parseInt(id) },
    });

    res.json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting Olympiad entry:", error);
    res.status(500).json({ success: false, message: "Error deleting entry" });
  }
};
