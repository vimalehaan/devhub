import { Router } from "express";
import {
  createIssueController,
  getIssuesController,
  getIssueController,
  updateIssueController,
} from "../controllers/issue.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/projects/:projectId/issues", authenticate, createIssueController);
router.get("/projects/:projectId/issues", authenticate, getIssuesController);
router.get(
  "/projects/:projectId/issues/:issueId",
  authenticate,
  getIssueController,
);
router.patch(
  "/projects/:projectId/issues/:issueId",
  authenticate,
  updateIssueController,
);

export default router;
