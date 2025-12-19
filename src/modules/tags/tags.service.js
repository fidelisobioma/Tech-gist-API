import { prisma } from "../../../lib/prisma.js";

export const createTag = async ({ name }) => {
  if (!name) {
    throw new Error("Tag name is required");
  }

  const existingTag = await prisma.tag.findUnique({
    where: { name },
  });

  if (existingTag) {
    throw new Error("Tag already exists");
  }

  return prisma.tag.create({
    data: { name },
    select: {
      id: true,
      name: true,
    },
  });
};

export const getAllTags = async () => {
  return prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};
