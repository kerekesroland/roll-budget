import { Budget } from "@prisma/client";
import { prisma } from "./prisma";
import getCurrentUser from "./getCurrentUser";
import { IBudget } from "@/models/Budget";

export const getIncome = async () => {
  const user = await getCurrentUser();
  try {
    const res: Budget[] = await prisma.budget.findMany({
      where: {
        userId: user?.id,
      },
    });

    const incomeBudgets: IBudget[] = res
      ?.filter((item) => item.type === "income")
      ?.map((item) => {
        return {
          ...item,
          date: item?.date?.toISOString(),
        };
      });
    return incomeBudgets;
  } catch (error) {
    console.error(error);
    return null;
  }
};
