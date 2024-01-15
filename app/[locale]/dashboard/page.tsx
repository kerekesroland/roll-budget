import DashboardContent from "@/components/dashboard/DashboardContent";
import { getBudgets } from "@/lib/getBudgets";
import { getCategories } from "@/lib/getCategories";
import { getExceededCategories } from "@/lib/getExceededCategories";
import { getIncome } from "@/lib/getIncome";

const Dashboard = async () => {
  const allExceededCategoriesPromise = getExceededCategories();
  const allIncomePromise = getIncome();
  const budgetsPromise = getBudgets();
  const categoriesPromise = getCategories();

  const [allExceededCategories, allIncome, budgets, categories] =
    await Promise.all([
      allExceededCategoriesPromise,
      allIncomePromise,
      budgetsPromise,
      categoriesPromise,
    ]);

  return (
    <DashboardContent
      allExceededCategories={allExceededCategories}
      allIncome={allIncome}
      budgets={budgets}
      categories={categories}
    />
  );
};

export default Dashboard;
