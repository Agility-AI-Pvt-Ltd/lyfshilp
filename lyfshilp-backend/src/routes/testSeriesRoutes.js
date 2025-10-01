// src/routes/testSeriesRoutes.js
import express from "express";
import { getTestSeries, createTestSeries } from "../controllers/testseriesController.js";

const router = express.Router();

// GET all test series
router.get("/", getTestSeries);

// POST new test series
router.post("/", createTestSeries);

export default router;
