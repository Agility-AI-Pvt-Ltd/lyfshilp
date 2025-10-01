// src/routes/externalLinksRoutes.js
import express from "express";
import { listExternalLinks } from "../controllers/externalLinksController.js";

const router = express.Router();

router.get("/", listExternalLinks);

export default router;
