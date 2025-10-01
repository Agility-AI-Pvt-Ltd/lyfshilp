// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: no token" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // fetch user minimal info
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true }
    });

    if (!user) return res.status(401).json({ error: "Unauthorized: user not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ error: "Unauthorized: invalid token" });
  }
}
