// src/routes/courseRoutes.js
import express from "express";
import {
  listCourses,
  getCourse,
  enrollInCourse,
  getDashboard
} from "../controllers/courseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listCourses);
router.get("/dashboard", authMiddleware, getDashboard);  // optional
router.get("/:id", getCourse);                          
router.post("/:id/enroll", authMiddleware, enrollInCourse);

export default router;
