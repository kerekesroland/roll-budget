import { Budget } from "@prisma/client";

import getCurrentUser from "./getCurrentUser";
import { prisma } from "./prisma";

export const getBudgets = async () => {
  try {
    const user = await getCurrentUser();
    const res: Budget[] = await prisma.budget.findMany({
      where: {
        userId: user?.id,
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
