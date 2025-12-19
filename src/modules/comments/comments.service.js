import { prisma } from "../../../lib/prisma.js";

export const createComment = async (data, authorId) => {
  const { postId, content } = data;

  if (!postId || !content) {
    throw new Error("Post ID and content are required");
  }

  // Optional: ensure post exists
  const postExists = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!postExists) {
    throw new Error("Post not found");
  }

  return prisma.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};
