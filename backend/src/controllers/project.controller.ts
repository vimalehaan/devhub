import { Request, Response } from "express";
import {
  createProject,
  getProjectsByOwner,
  getProjectById,
  updateProject,
  deleteProject
} from "../services/project.service.js";

export const createProjectController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({
        message: "Project name is required",
      });
      return;
    }

    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const project = await createProject({
      name,
      description,
      ownerId: req.userId,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

export const getProjectsController = async (
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

    const projects = await getProjectsByOwner(req.userId);

    res.status(200).json({
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Failed to get projects",
    });
  }
};

export const getProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    const project = await getProjectById(
      projectId,
      req.userId
    );

    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      message: "Failed to get project",
    });
  }
};

export const updateProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    const { name, description } = req.body;

    if (name === undefined && description === undefined) {
      res.status(400).json({
        message: "At least one field is required to update",
      });
      return;
    }

    if (name !== undefined && !name) {
      res.status(400).json({
        message: "Project name cannot be empty",
      });
      return;
    }

    const project = await updateProject(
      projectId,
      req.userId,
      name,
      description
    );

    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

export const deleteProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      res.status(400).json({
        message: "Invalid project ID",
      });
      return;
    }

    const project = await deleteProject(
      projectId,
      req.userId
    );

    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project,
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};