import { Router } from "express";
import { uploadMedia } from "./media.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = Router();

// Admin uploads media to a post
router.post(
  "/:postId",
  authenticate,
  authorize("ADMIN"),
  upload.single("file"),
  uploadMedia
);

export default router;
