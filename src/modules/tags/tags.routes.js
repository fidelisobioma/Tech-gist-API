import { Router } from "express";
import { createTag, getAllTags } from "./tags.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = Router();

// Public – fetch tags
router.get("/", getAllTags);

// Admin only – create tag
router.post("/", authenticate, authorize("ADMIN"), createTag);

export default router;
