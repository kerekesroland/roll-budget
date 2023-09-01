import { Budget } from "@prisma/client";
import { prisma } from "./prisma";

export const getBudgets = async (userId: string) => {
  try {
    const res: Budget[] = await prisma.budget.findMany({
      where: {
        userId: userId,
      },
    });

    const returnValue = res?.map((item) => {
      return {
        ...item,
        date: item?.date?.toISOString(),
      };
    });
    return returnValue;
  } catch (error) {
    console.error(error);
    return null;
  }
};
