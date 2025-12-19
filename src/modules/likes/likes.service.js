import { prisma } from "../../../lib/prisma.js";

export const likePost = async (userId, postId) => {
  // Optional: ensure post exists
  const postExists = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!postExists) {
    throw new Error("Post not found");
  }

  return prisma.like.create({
    data: {
      userId,
      postId,
    },
  });
};

export const unlikePost = async (userId, postId) => {
  return prisma.like.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
};
