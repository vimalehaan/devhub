import { pool } from "../config/database.js";

interface CreateProjectInput {
  name: string;
  description?: string;
  ownerId: number;
}

export const createProject = async ({
  name,
  description,
  ownerId,
}: CreateProjectInput) => {
  const result = await pool.query(
    `
    INSERT INTO projects (name, description, owner_id)
    VALUES ($1, $2, $3)
    RETURNING id, name, description, owner_id, created_at
    `,
    [name, description || null, ownerId]
  );

  return result.rows[0];
};

export const getProjectsByOwner = async (ownerId: number) => {
  const result = await pool.query(
    `
    SELECT id, name, description, owner_id, created_at
    FROM projects
    WHERE owner_id = $1
    ORDER BY created_at DESC
    `,
    [ownerId]
  );

  return result.rows;
};

export const getProjectById = async (
  projectId: number,
  ownerId: number
) => {
  const result = await pool.query(
    `
    SELECT id, name, description, owner_id, created_at
    FROM projects
    WHERE id = $1
      AND owner_id = $2
    `,
    [projectId, ownerId]
  );

  return result.rows[0];
};

export const updateProject = async (
  projectId: number,
  ownerId: number,
  name?: string,
  description?: string
) => {
  const result = await pool.query(
    `
    UPDATE projects
    SET
      name = COALESCE($1, name),
      description = COALESCE($2, description)
    WHERE id = $3
      AND owner_id = $4
    RETURNING id, name, description, owner_id, created_at
    `,
    [name, description, projectId, ownerId]
  );

  return result.rows[0];
};

export const deleteProject = async (
  projectId: number,
  ownerId: number
) => {
  const result = await pool.query(
    `
    DELETE FROM projects
    WHERE id = $1
      AND owner_id = $2
    RETURNING id, name, description, owner_id, created_at
    `,
    [projectId, ownerId]
  );

  return result.rows[0];
};