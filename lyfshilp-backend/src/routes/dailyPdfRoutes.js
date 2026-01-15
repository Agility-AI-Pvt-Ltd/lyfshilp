import express from "express";
import { createDailyPdfRequest } from "../controllers/dailyPdfController.js";

const router = express.Router();

router.post("/register", createDailyPdfRequest);

export default router;
