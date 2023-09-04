import getCurrentUser from "./getCurrentUser";
import { prisma } from "./prisma";
import { ICategory } from "@/models/Category";
import { capitalizeFirstLetter } from "./utils";

export const getExceededCategories = async (take?: number) => {
  const user = await getCurrentUser();
  try {
    const res = await prisma.category.findMany({
      where: {
        current: {
          gt: prisma.category.fields.limit,
        },
        userId: user?.id,
      },
      orderBy: {
        current: "desc",
      },
      take: take,
    });
    const withCorrectIcon: ICategory[] = res.map((item: ICategory) => {
      return {
        ...item,
        icon: `/images/${capitalizeFirstLetter(item.icon)}.svg`,
      };
    });
    return withCorrectIcon;
  } catch (error: any) {
    throw new Error(error);
  }
};
