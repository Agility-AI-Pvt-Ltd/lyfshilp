import express from "express";
import {
  createApplication,
  getAllApplications,
  addApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Form submit
router.post("/", createApplication);

// Admin CRUD
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
router.post("/add", authMiddleware, adminMiddleware, addApplication);
router.put("/update/:id", authMiddleware, adminMiddleware, updateApplication);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteApplication);

export default router;
