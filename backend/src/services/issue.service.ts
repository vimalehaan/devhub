import { pool } from "../config/database.js";

interface CreateIssueInput {
  projectId: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  assigneeId?: number;
}

interface UpdateIssueInput {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigneeId?: number | null;
}

export const createIssue = async ({
  projectId,
  title,
  description,
  status,
  priority,
  assigneeId,
}: CreateIssueInput) => {
  const result = await pool.query(
    `
    INSERT INTO issues (
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id,
      created_at
    `,
    [
      projectId,
      title,
      description || null,
      status || "TODO",
      priority || "MEDIUM",
      assigneeId || null,
    ],
  );

  return result.rows[0];
};

export const getIssuesByProject = async (projectId: number) => {
  const result = await pool.query(
    `
    SELECT
      id,
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id,
      created_at
    FROM issues
    WHERE project_id = $1
    ORDER BY created_at DESC
    `,
    [projectId],
  );

  return result.rows;
};

export const getIssueById = async (issueId: number, projectId: number) => {
  const result = await pool.query(
    `
    SELECT
      id,
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id,
      created_at
    FROM issues
    WHERE id = $1
      AND project_id = $2
    `,
    [issueId, projectId],
  );

  return result.rows[0];
};

export const updateIssue = async (
  issueId: number,
  projectId: number,
  { title, description, status, priority, assigneeId }: UpdateIssueInput,
) => {
  const result = await pool.query(
    `
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      status = COALESCE($3, status),
      priority = COALESCE($4, priority),
      assignee_id = COALESCE($5, assignee_id)
    WHERE id = $6
      AND project_id = $7
    RETURNING
      id,
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id,
      created_at
    `,
    [title, description, status, priority, assigneeId, issueId, projectId],
  );

  return result.rows[0];
};

export const deleteIssue = async (
  issueId: number,
  projectId: number
) => {
  const result = await pool.query(
    `
    DELETE FROM issues
    WHERE id = $1
      AND project_id = $2
    RETURNING
      id,
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id,
      created_at
    `,
    [issueId, projectId]
  );

  return result.rows[0];
};