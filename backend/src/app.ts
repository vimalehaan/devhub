import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

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
app.listen(PORT, () => {
  console.log(`DevHub API running on port ${PORT}`);
});