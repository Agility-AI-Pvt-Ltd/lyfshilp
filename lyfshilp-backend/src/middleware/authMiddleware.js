// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

/**
 * ✅ Normal authentication (student/instructor/admin sabko allow)
 */
export async function authMiddleware(req, res, next) {
  try {
    // Token header ya cookie se nikalna
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Token missing
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: no token" });
    }

    // Token verify karna
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // DB se user fetch karna
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    // Agar user exist nahi karta
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    // Request me user attach kar dena
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ authMiddleware error:", err.message);
    return res.status(401).json({ error: "Unauthorized: invalid token" });
  }
}

/**
 * ✅ Extra middleware: Only admins allowed
 */
export function adminMiddleware(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: no user" });
    }

    // Role check — "ADMIN" ya "admin" dono handle kare
    const role = req.user.role?.toUpperCase();
    if (role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }

    next();
  } catch (err) {
    console.error("adminMiddleware error:", err.message);
    return res.status(500).json({ error: "Server error in adminMiddleware" });
  }
}
