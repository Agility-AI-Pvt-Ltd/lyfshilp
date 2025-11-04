// src/controllers/callbackController.js
import prisma from "../prismaClient.js";

/**
 * POST /callback/register
 * Public: Register a new callback request (from website form)
 */
export const registerCallback = async (req, res) => {
  try {
    const { name, phone, studentClass, stream, school, pageName } = req.body;

    if (!name || !phone || !studentClass || !stream || !school) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const callback = await prisma.callbackRequest.create({
      data: { name, phone, studentClass, stream, school, pageName },
    });

    res.status(201).json({
      success: true,
      message: "Callback request submitted successfully",
      data: callback,
    });
  } catch (error) {
    console.error("Error registering callback:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting callback request",
    });
  }
};

/**
 * GET /callback/all
 * Admin: Fetch all callback requests
 */
export const getAllCallbacks = async (req, res) => {
  try {
    const callbacks = await prisma.callbackRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: callbacks });
  } catch (error) {
    console.error("Error fetching callbacks:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching callbacks",
    });
  }
};

/**
 * POST /callback/add
 * Admin: Add a new callback entry manually
 */
export const addCallbackEntry = async (req, res) => {
  try {
    const { name, phone, studentClass, stream, school, pageName } = req.body;

    if (!name || !phone || !studentClass || !stream || !school) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newEntry = await prisma.callbackRequest.create({
      data: { name, phone, studentClass, stream, school, pageName },
    });

    res.status(201).json({
      success: true,
      message: "Callback entry added successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error adding callback entry:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding callback entry",
    });
  }
};

/**
 * PUT /callback/update/:id
 * Admin: Update an existing callback entry
 */
export const updateCallbackEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEntry = await prisma.callbackRequest.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.json({
      success: true,
      message: "Callback entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    console.error("Error updating callback entry:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating callback entry",
    });
  }
};

/**
 * DELETE /callback/delete/:id
 * Admin: Delete a callback entry
 */
export const deleteCallbackEntry = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.callbackRequest.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      success: true,
      message: "Callback entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting callback entry:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting callback entry",
    });
  }
};
