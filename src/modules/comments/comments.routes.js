import { Router } from "express";
import { createComment } from "./comments.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

// Any authenticated user can comment
router.post("/", authenticate, createComment);

export default router;
