import express from "express";
import {
  getProfile,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged-in user
router.get("/profile", authMiddleware, getProfile);

// Admin CRUD
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);
router.post("/add", authMiddleware, adminMiddleware, addUser);
router.put("/update/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
