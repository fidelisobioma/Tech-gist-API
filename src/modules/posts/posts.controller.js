import * as postService from "./posts.service.js";

export const createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body, req.user.userId);

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
