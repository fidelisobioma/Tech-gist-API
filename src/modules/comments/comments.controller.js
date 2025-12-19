import * as commentService from "./comments.service.js";

export const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
