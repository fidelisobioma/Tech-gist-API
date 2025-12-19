import { Router } from "express";
import passport from "passport";
import { googleCallback } from "./auth.controller.js";
import { register, login } from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallback
);

export default router;
