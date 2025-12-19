import * as tagService from "./tags.service.js";

export const createTag = async (req, res, next) => {
  try {
    const tag = await tagService.createTag(req.body);

    res.status(201).json({
      message: "Tag created successfully",
      data: tag,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTags = async (req, res, next) => {
  try {
    const tags = await tagService.getAllTags();

    res.status(200).json({
      data: tags,
    });
  } catch (error) {
    next(error);
  }
};
