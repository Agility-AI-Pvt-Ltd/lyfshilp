// src/routes/testRoutes.js
import express from "express";
import { submitTest, getTestSubmissions } from "../controllers/testController.js";

const router = express.Router();

// Submit a test
router.post("/submit", submitTest);

// Get all submissions for a test
router.get("/:testId/submissions", getTestSubmissions);

export default router;
