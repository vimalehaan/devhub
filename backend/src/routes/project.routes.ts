import { Router } from "express";
import {
  createProjectController,
  getProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createProjectController);
router.get("/", authenticate, getProjectsController);
router.get("/:id", authenticate, getProjectController);
router.patch("/:id", authenticate, updateProjectController);
router.delete("/:id", authenticate, deleteProjectController);

export default router;
