// src/routes/careerGuidanceRoutes.js
import express from "express";
import {
    submitCareerGuidance,
    getEligibleCourses
} from "../controllers/careerGuidanceController.js";
import {
    sendOtpController,
    verifyOtpController,
    getAllVerifiedNumbers
} from "../controllers/otpController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import { validateOtpSession } from "../middleware/otpMiddleware.js";

const router = express.Router();

/**
 * POST /api/career-guidance/send-otp
 * Generate and send OTP to phone number
 */
router.post("/send-otp", sendOtpController);

/**
 * POST /api/career-guidance/verify-otp
 * Verify OTP code and get session token
 */
router.post("/verify-otp", verifyOtpController);

/**
 * POST /api/career-guidance/eligible-courses
 * Get eligible courses based on student profile
 * PROTECTED: Requires valid OTP session
 */
router.post("/eligible-courses", validateOtpSession, getEligibleCourses);

/**
 * POST /api/career-guidance/submit
 * Submit career guidance form (optional - for analytics)
 */
router.post("/submit", submitCareerGuidance);

/**
 * GET /api/career-guidance/verified-numbers
 * Get all verified phone numbers (ADMIN ONLY)
 */
router.get("/verified-numbers", authMiddleware, adminMiddleware, getAllVerifiedNumbers);

export default router;
