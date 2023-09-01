import DashboardContent from "@/components/DashboardContent";
import { getExceededCategories } from "@/lib/getExceededCategories";
import { getIncome } from "@/lib/getIncome";

const Dashboard = async () => {
  const topExceededCategories = await getExceededCategories();
  const allIncome = await getIncome();
  // const exceededBudgets = await getExceededBudgets();
  return (
    <DashboardContent
      topExceededCategories={topExceededCategories}
      allIncome={allIncome}
    />
  );
};

export default Dashboard;
