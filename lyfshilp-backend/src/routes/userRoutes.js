// src/routes/userRoutes.js
import express from "express";
import { getProfile, getAllUsers } from "../controllers/userController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// Admin only route
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);

export default router;
