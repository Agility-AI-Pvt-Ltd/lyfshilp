import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";

// Get profile
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    res.json({ users });
  } catch (err) {
    console.error("Get All Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new user (Admin manually sets password)
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, role, password: hashedPassword },
    });

    res.status(201).json({ success: true, message: "User added successfully", data: newUser });
  } catch (err) {
    console.error("Add User Error:", err);
    res.status(500).json({ success: false, message: "Error adding user" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const updateData = { name, email, role };

    // Optional: allow admin to update password
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.json({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ success: false, message: "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};
