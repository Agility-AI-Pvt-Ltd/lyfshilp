import prisma from "../prismaClient.js";
import { sendMailToAdmins, sendMailToUser } from "../utils/sendMail.js";

/**
 * 📝 Public: Submit Partner School Enroll Form
 */
export const submitPartnerSchoolForm = async (req, res) => {
  try {
    const { schoolName, contactPerson, designation, phone, email } = req.body;

    // 🔍 Validation
    if (!schoolName || !contactPerson || !designation || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 📦 Save to DB
    const form = await prisma.partnerSchoolForm.create({
      data: { schoolName, contactPerson, designation, phone, email },
    });

    // 📧 Mail to user
    await sendMailToUser({
      email,
      name: contactPerson,
      formName: "Partner School Enrollment",
    });

    // 📧 Mail to admins
    await sendMailToAdmins({
      formName: "Partner School Enrollment",
      name: contactPerson,
      email,
      formData: req.body,
      meta: {
        path: req.originalUrl,
        userAgent: req.headers["user-agent"],
        submittedAt: new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: form,
    });
  } catch (error) {
    console.error("❌ Error creating partner school form:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * 👑 Admin: Get All Partner School Forms
 */
export const getAllPartnerSchoolForms = async (req, res) => {
  try {
    const forms = await prisma.partnerSchoolForm.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: forms });
  } catch (error) {
    console.error("❌ Error fetching partner school forms:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ➕ Admin: Add New Form Manually
 */
export const addPartnerSchoolForm = async (req, res) => {
  try {
    const { schoolName, contactPerson, designation, phone, email } = req.body;

    if (!schoolName || !contactPerson || !designation || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newForm = await prisma.partnerSchoolForm.create({
      data: { schoolName, contactPerson, designation, phone, email },
    });

    // 📧 Mail to user
    await sendMailToUser({
      email,
      name: contactPerson,
      formName: "Partner School Enrollment",
    });

    // 📧 Mail to admins
    await sendMailToAdmins({
      formName: "Partner School Enrollment",
      name: contactPerson,
      email,
      formData: req.body,
      meta: {
        path: req.originalUrl,
        userAgent: req.headers["user-agent"],
        submittedAt: new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Partner school form added successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("❌ Error adding partner school form:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ✏️ Admin: Update Form
 */
export const updatePartnerSchoolForm = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.partnerSchoolForm.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("❌ Error updating partner school form:", error);
    res.status(500).json({ success: false, message: "Error updating form" });
  }
};

/**
 * 🗑️ Admin: Delete Form
 */
export const deletePartnerSchoolForm = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.partnerSchoolForm.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Partner school form deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Form not found or already deleted",
      });
    }

    console.error("❌ Error deleting partner school form:", error);
    res.status(500).json({ success: false, message: "Error deleting form" });
  }
};
