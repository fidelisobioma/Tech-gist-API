import { prisma } from "../../prisma/client.js";

export const createMedia = async (postId, file) => {
  const mediaType = file.mimetype.startsWith("image/")
    ? file.mimetype === "image/gif"
      ? "GIF"
      : "IMAGE"
    : "VIDEO";

  const url = `/uploads/${file.filename}`;

  return prisma.media.create({
    data: {
      url,
      type: mediaType,
      postId,
    },
  });
};
