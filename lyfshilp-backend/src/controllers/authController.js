// src/controllers/authController.js
import prisma from "../prismaClient.js";
import { hashPassword, comparePassword } from "../utils/hashUtil.js";
import jwt from "jsonwebtoken";

/**
 * Helper function to generate JWT
 */
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role }, // role bhi token me save hoga
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

/**
 * POST /api/auth/register
 * body: { firstName, lastName, email, password }
 */
export async function register(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ error: "firstName, lastName, email and password required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashed = await hashPassword(password);
    const fullName = `${firstName} ${lastName}`.trim();

    const user = await prisma.user.create({
      data: { name: fullName, email, password: hashed }, // role default = "student"
    });

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    res.json({
      message: "Registration successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * POST /api/auth/login
 * body: { email, password }
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    res.json({
      message: "Login successful!",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * GET /api/auth/me
 */
export async function me(req, res) {
  res.json({ user: req.user });
}
