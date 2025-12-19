import { prisma } from "../../../lib/prisma.js";

export const createCategory = async ({ name }) => {
  if (!name) {
    throw new Error("Category name is required");
  }

  const existingCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return prisma.category.create({
    data: { name },
    select: {
      id: true,
      name: true,
    },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};
