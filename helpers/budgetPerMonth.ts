import { prisma } from "@/lib/prisma";

export async function calculateCurrentPerMonth(categoryId: string) {
  const currentMonth = new Date().getMonth() + 1;

  const budgetsInCurrentMonth = await prisma.budget.findMany({
    where: {
      categoryId,
      date: {
        gte: new Date(new Date().getFullYear(), currentMonth - 1, 1),
        lt: new Date(new Date().getFullYear(), currentMonth, 1),
      },
    },
  });

  const filteredBudgetsByExpense = budgetsInCurrentMonth.filter(
    (budget) => budget?.type === "expense"
  );

  const currentPerMonth = filteredBudgetsByExpense.reduce(
    (sum, budget) => sum + budget.price,
    0
  );

  return currentPerMonth;
}
