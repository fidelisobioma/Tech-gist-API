import { Router } from "express";
import { createPost } from "./posts.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = Router();

// ADMIN ONLY
router.post("/", authenticate, authorize("ADMIN"), createPost);

export default router;
