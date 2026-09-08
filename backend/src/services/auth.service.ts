import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface JwtPayload {
  userId: number;
}

export const generateToken = (userId: number): string => {
  return jwt.sign(
    { userId },
    env.jwtSecret,
    {
      expiresIn: "1h",
    }
  );
};