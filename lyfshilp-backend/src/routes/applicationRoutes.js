// src/routes/applicationRoutes.js
import express from "express";
import {
  createApplication,
  getAllApplications,
} from "../controllers/applicationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * 📝 Candidate: Resume form submit (public route)
 */
router.post("/", createApplication);

/**
 * 👑 Admin: Get all applications (protected route)
 */
router.get(
  "/all",
  authMiddleware, // verify token + user
  (req, res, next) => {
    if (req.user?.role?.toUpperCase() !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }
    next();
  },
  getAllApplications
);

export default router;
