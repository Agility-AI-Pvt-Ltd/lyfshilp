import express from "express";
import {
  registerCallback,
  getAllCallbacks,
  addCallbackEntry,
  updateCallbackEntry,
  deleteCallbackEntry,
} from "../controllers/callbackController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/register", registerCallback);

// Admin routes
router.get("/all", authMiddleware, adminMiddleware, getAllCallbacks);
router.post("/add", authMiddleware, adminMiddleware, addCallbackEntry);
router.put("/update/:id", authMiddleware, adminMiddleware, updateCallbackEntry);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteCallbackEntry);

export default router;