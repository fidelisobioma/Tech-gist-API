import { Router } from "express";
import { likePost, unlikePost } from "./likes.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/:postId", authenticate, likePost);
router.delete("/:postId", authenticate, unlikePost);

export default router;
