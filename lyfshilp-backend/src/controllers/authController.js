// src/controllers/authController.js
import prisma from "../prismaClient.js";
import { hashPassword, comparePassword } from "../utils/hashUtil.js";
import jwt from "jsonwebtoken";

/**
 * POST /api/auth/register
 * body: { firstName, lastName, email, password }
 */
export async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ error: "firstName, lastName, email and password required" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ error: "Email already in use" });

  const hashed = await hashPassword(password);

  // merge firstName + lastName into single name
  const fullName = `${firstName} ${lastName}`.trim();

  const user = await prisma.user.create({
    data: { name: fullName, email, password: hashed },
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

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
}

/**
 * POST /api/auth/login
 * body: { email, password }
 */
export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email and password required" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await comparePassword(password, user.password);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

  res.json({
    message: "Login successful!",
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  });
}

/**
 * GET /api/auth/me
 */
export async function me(req, res) {
  res.json({ user: req.user });
}
