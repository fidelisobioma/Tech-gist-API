import * as likeService from "./likes.service.js";

export const likePost = async (req, res, next) => {
  try {
    const like = await likeService.likePost(req.user.userId, req.params.postId);

    res.status(201).json({
      message: "Post liked",
      data: like,
    });
  } catch (error) {
    next(error);
  }
};

export const unlikePost = async (req, res, next) => {
  try {
    await likeService.unlikePost(req.user.userId, req.params.postId);

    res.status(200).json({
      message: "Post unliked",
    });
  } catch (error) {
    next(error);
  }
};
