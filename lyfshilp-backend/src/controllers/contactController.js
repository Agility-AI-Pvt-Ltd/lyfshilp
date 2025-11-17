// src/controllers/contactController.js
import prisma from "../prismaClient.js";
import { sendMailToAdmins, sendMailToUser } from "../utils/sendMail.js";

/**
 * POST /contact/register
 * Public: Register new contact form submission
 */
export const registerContact = async (req, res) => {
  try {
    const {
      name,
      email,
      exam,
      phone,
      studentClass,
      stream,
      school,
      pageName,
    } = req.body;

    // Required validation
    if (
      !name ||
      !email ||
      !exam ||
      !phone ||
      !studentClass ||
      !stream ||
      !school
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Insert into database
    const contact = await prisma.Contactus.create({
      data: {
        name,
        email,
        exam,
        phone,
        studentClass,
        stream,
        school,
        pageName,
      },
    });

    // Mail to user
    await sendMailToUser({
      email,
      name,
      formName: "Contact Request",
    });

    // Mail to admins
    await sendMailToAdmins({
      formName: "Contact Request",
      name,
      email,
      formData: req.body,
      meta: {
        path: req.originalUrl,
        userAgent: req.headers["user-agent"],
        submittedAt: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({
      success: false,
      message: "Check your Internet Connection",
    });
  }
};

/**
 * GET /contact/all
 * Admin: Fetch all contact entries
 */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.Contactus.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching contacts",
    });
  }
};

/**
 * POST /contact/add
 * Admin: Add a contact entry manually
 */
export const addContactEntry = async (req, res) => {
  try {
    const {
      name,
      email,
      exam,
      phone,
      studentClass,
      stream,
      school,
      pageName,
    } = req.body;

    if (
      !name ||
      !email ||
      !exam ||
      !phone ||
      !studentClass ||
      !stream ||
      !school
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newEntry = await prisma.Contactus.create({
      data: {
        name,
        email,
        exam,
        phone,
        studentClass,
        stream,
        school,
        pageName,
      },
    });

    res.status(201).json({
      success: true,
      message: "Contact entry added successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error adding contact entry:", error);
    res.status(500).json({
      success: false,
      message: "check your Internet Connection",
    });
  }
};

/**
 * PUT /contact/update/:id
 * Admin: Update existing contact entry
 */
export const updateContactEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEntry = await prisma.Contactus.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Contact entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({
      success: false,
      message: "Please Check Your Internet while updating entry",
    });
  }
};

/**
 * DELETE /contact/delete/:id
 * Admin: Delete contact entry
 */
export const deleteContactEntry = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.Contactus.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Contact entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({
      success: false,
      message: "Please check Your Internet while deleting entry",
    });
  }
};
