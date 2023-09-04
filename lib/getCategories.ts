import { Category } from "@prisma/client";
import { prisma } from "./prisma";
import getCurrentUser from "./getCurrentUser";

export const getCategories = async (userId?: string) => {
  try {
    const user = await getCurrentUser();
    const res: Category[] = await prisma.category.findMany({
      where: {
        userId: user?.id,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
