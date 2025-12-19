import { Router } from "express";
import { createCategory, getAllCategories } from "./categories.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = Router();

// Public – fetch categories
router.get("/", getAllCategories);

// Admin only – create category
router.post("/", authenticate, authorize("ADMIN"), createCategory);

export default router;
