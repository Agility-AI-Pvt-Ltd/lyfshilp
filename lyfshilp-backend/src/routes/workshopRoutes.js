import express from "express";
import {
  registerWorkshop,
  getAllWorkshopRegistrations,
  addWorkshopEntry,
  updateWorkshopEntry,
  deleteWorkshopEntry,
} from "../controllers/workshopController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/register", registerWorkshop);

// Admin routes
router.get("/all", authMiddleware, adminMiddleware, getAllWorkshopRegistrations);
router.post("/add", authMiddleware, adminMiddleware, addWorkshopEntry);
router.put("/update/:id", authMiddleware, adminMiddleware, updateWorkshopEntry);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteWorkshopEntry);

export default router;
