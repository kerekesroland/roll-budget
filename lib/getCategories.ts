import { Category } from "@prisma/client";
import { prisma } from "./prisma";

export const getCategories = async (userId: string) => {
  try {
    const res: Category[] = await prisma.category.findMany({
      where: {
        userId: userId,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
