import { prisma } from "../../../lib/prisma.js";

export const createPost = async (data, authorId) => {
  const {
    title,
    content,
    excerpt,
    published,
    tagIds = [],
    categoryIds = [],
  } = data;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  return prisma.post.create({
    data: {
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      content,
      excerpt,
      published: published ?? false,
      authorId,

      // attach tags
      tags: {
        create: tagIds.map((tagId) => ({
          tag: {
            connect: { id: tagId },
          },
        })),
      },

      // attach categories
      categories: {
        create: categoryIds.map((categoryId) => ({
          category: {
            connect: { id: categoryId },
          },
        })),
      },
    },

    // ✅ correct placement
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      createdAt: true,

      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      categories: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};
