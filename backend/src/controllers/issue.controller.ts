import { Request, Response } from "express";
import { pool } from "../config/database.js";
import {
  createIssue,
  getIssuesByProject,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../services/issue.service.js";

export const createIssueController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.projectId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    const { title, description, status, priority, assigneeId } = req.body;

    if (!title) {
      res.status(400).json({
        message: "Issue title is required",
      });
      return;
    }

    const projectResult = await pool.query(
      `
      SELECT id
      FROM projects
      WHERE id = $1
        AND owner_id = $2
      `,
      [projectId, req.userId],
    );

    if (projectResult.rows.length === 0) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    const issue = await createIssue({
      projectId,
      title,
      description,
      status,
      priority,
      assigneeId,
    });

    res.status(201).json({
      message: "Issue created successfully",
      issue,
    });
  } catch (error) {
    console.error("Create issue error:", error);

    res.status(500).json({
      message: "Failed to create issue",
    });
  }
};

export const getIssuesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.projectId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    const projectResult = await pool.query(
      `
      SELECT id
      FROM projects
      WHERE id = $1
        AND owner_id = $2
      `,
      [projectId, req.userId],
    );

    if (projectResult.rows.length === 0) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    const issues = await getIssuesByProject(projectId);

    res.status(200).json({
      issues,
    });
  } catch (error) {
    console.error("Get issues error:", error);

    res.status(500).json({
      message: "Failed to get issues",
    });
  }
};

export const getIssueController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.projectId);
    const issueId = Number(req.params.issueId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    if (!Number.isInteger(issueId) || issueId <= 0) {
      res.status(400).json({
        message: "Invalid issue ID",
      });
      return;
    }

    const projectResult = await pool.query(
      `
      SELECT id
      FROM projects
      WHERE id = $1
        AND owner_id = $2
      `,
      [projectId, req.userId],
    );

    if (projectResult.rows.length === 0) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    const issue = await getIssueById(issueId, projectId);

    if (!issue) {
      res.status(404).json({
        message: "Issue not found",
      });
      return;
    }

    res.status(200).json({
      issue,
    });
  } catch (error) {
    console.error("Get issue error:", error);

    res.status(500).json({
      message: "Failed to get issue",
    });
  }
};

export const updateIssueController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.projectId);
    const issueId = Number(req.params.issueId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    if (!Number.isInteger(issueId) || issueId <= 0) {
      res.status(400).json({
        message: "Invalid issue ID",
      });
      return;
    }

    const projectResult = await pool.query(
      `
      SELECT id
      FROM projects
      WHERE id = $1
        AND owner_id = $2
      `,
      [projectId, req.userId],
    );

    if (projectResult.rows.length === 0) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    const issue = await getIssueById(issueId, projectId);

    if (!issue) {
      res.status(404).json({
        message: "Issue not found",
      });
      return;
    }

    const { title, description, status, priority, assigneeId } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      status === undefined &&
      priority === undefined &&
      assigneeId === undefined
    ) {
      res.status(400).json({
        message: "At least one field is required",
      });
      return;
    }

    if (title !== undefined && !title.trim()) {
      res.status(400).json({
        message: "Issue title cannot be empty",
      });
      return;
    }

    const updatedIssue = await updateIssue(issueId, projectId, {
      title,
      description,
      status,
      priority,
      assigneeId,
    });

    res.status(200).json({
      message: "Issue updated successfully",
      issue: updatedIssue,
    });
  } catch (error) {
    console.error("Update issue error:", error);

    res.status(500).json({
      message: "Failed to update issue",
    });
  }
};

export const deleteIssueController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.projectId);
    const issueId = Number(req.params.issueId);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    if (!Number.isInteger(issueId) || issueId <= 0) {
      res.status(400).json({
        message: "Invalid issue ID",
      });
      return;
    }

    const projectResult = await pool.query(
      `
      SELECT id
      FROM projects
      WHERE id = $1
        AND owner_id = $2
      `,
      [projectId, req.userId],
    );

    if (projectResult.rows.length === 0) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    const issue = await deleteIssue(issueId, projectId);

    if (!issue) {
      res.status(404).json({
        message: "Issue not found",
      });
      return;
    }

    res.status(200).json({
      message: "Issue deleted successfully",
      issue,
    });
  } catch (error) {
    console.error("Delete issue error:", error);

    res.status(500).json({
      message: "Failed to delete issue",
    });
  }
};
