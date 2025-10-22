import express from "express";
import {
  registerOlympiad,
  getAllOlympiadRegistrations,
  addOlympiadEntry,
  updateOlympiadEntry,
  deleteOlympiadEntry,
} from "../controllers/olympiadController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerOlympiad);

// Admin CRUD
router.get("/all", authMiddleware, adminMiddleware, getAllOlympiadRegistrations);
router.post("/add", authMiddleware, adminMiddleware, addOlympiadEntry);
router.put("/update/:id", authMiddleware, adminMiddleware, updateOlympiadEntry);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteOlympiadEntry);

export default router;
