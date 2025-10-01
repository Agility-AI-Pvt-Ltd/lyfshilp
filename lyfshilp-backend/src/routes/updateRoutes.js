// src/routes/updateRoutes.js
import express from "express";
import { getUpdates, createUpdate } from "../controllers/updateController.js";

const router = express.Router();

// GET all daily updates
router.get("/", getUpdates);

// POST new daily update
router.post("/", createUpdate);

export default router;
