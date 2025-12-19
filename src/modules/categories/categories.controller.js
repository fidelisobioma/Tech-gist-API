import * as categoryService from "./categories.service.js";

export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
