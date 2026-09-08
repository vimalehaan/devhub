import bcrypt from "bcrypt";
import { pool } from "../config/database.js";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserInput) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
    `,
    [name, email, passwordHash],
  );

  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id, name, email, password_hash, created_at
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
};

export const findUserById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};