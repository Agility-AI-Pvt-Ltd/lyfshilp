import express from "express";
import {
  registerContact,
  getAllContacts,
  addContactEntry,
  updateContactEntry,
  deleteContactEntry,
} from "../controllers/contactController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Contact form submit
router.post("/register", registerContact);

// Admin routes (protected)
router.get("/all", authMiddleware, adminMiddleware, getAllContacts);
router.post("/add", authMiddleware, adminMiddleware, addContactEntry);
router.put("/update/:id", authMiddleware, adminMiddleware, updateContactEntry);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteContactEntry);

export default router;