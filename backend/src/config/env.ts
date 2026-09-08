import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export const env = {
  port: PORT,
  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || "devhub",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  },
  jwtSecret:
    process.env.JWT_SECRET ||
    (() => {
      throw new Error("JWT_SECRET is not configured");
    })(),
};
