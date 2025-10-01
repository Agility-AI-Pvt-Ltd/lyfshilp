// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "express-async-errors"; // async error handling

// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import externalLinkRoutes from "./routes/externalLinkRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import testSeriesRoutes from "./routes/testSeriesRoutes.js";
import updateRoutes from "./routes/updateRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();

// --- Middlewares ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // frontend ka URL env me rakho
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/external-links", externalLinkRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/testseries", testSeriesRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/user",userRoutes);

app.use("/api/applications", applicationRoutes);



// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Lyfshilp Academy API 🚀" });
});

// --- Global Error handler ---
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
  });
});

export default app;
