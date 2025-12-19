import passport from "passport";
import "./config/passport.js";
import path from "path";
import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import postRoutes from "./modules/posts/posts.routes.js";
import commentRoutes from "./modules/comments/comments.routes.js";
import tagRoutes from "./modules/tags/tags.routes.js";
import categoryRoutes from "./modules/categories/categories.routes.js";
import likeRoutes from "./modules/likes/likes.routes.js";

const app = express();

//middleware`
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/likes", likeRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(passport.initialize());

//Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(400).json({
    message: err.message || "Something went wrong",
  });
});

export default app;
