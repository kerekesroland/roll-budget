import DashboardContent from "@/components/dashboard/DashboardContent";
import { getBudgets } from "@/lib/getBudgets";
import { getCategories } from "@/lib/getCategories";
import { getExceededCategories } from "@/lib/getExceededCategories";
import { getIncome } from "@/lib/getIncome";

const Dashboard = async () => {
  const allExceededCategories = await getExceededCategories();
  const allIncome = await getIncome();
  const budgets = await getBudgets();
  const categories = await getCategories();

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
