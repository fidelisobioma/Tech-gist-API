import * as mediaService from "./media.service.js";

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("File is required");
    }

    const media = await mediaService.createMedia(req.params.postId, req.file);

    res.status(201).json({
      message: "Media uploaded successfully",
      data: media,
    });
  } catch (error) {
    next(error);
  }
};
