import { prisma } from "./prisma";

export const getCategories = async (userId: string) => {
  return await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
};
