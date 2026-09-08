import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { pool } from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import issueRoutes from "./routes/issue.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", issueRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "DevHub API",
  });
});

// Start server
app.listen(env.port, async () => {
  console.log(`DevHub API running on port ${env.port}`);

  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
