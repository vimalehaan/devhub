import express from "express";
import cors from "cors";
import { env } from "./config/env.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "DevHub API",
  });
});

// Start server
app.listen(env.port, () => {
  console.log(`DevHub API running on port ${env.port}`);
});