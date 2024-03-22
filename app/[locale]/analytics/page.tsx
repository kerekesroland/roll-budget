import AnalyticsContent from "@/components/analytics/AnalyticsContent";
import { getBudgets } from "@/lib/getBudgets";
import { getExceededCategories } from "@/lib/getExceededCategories";

const Analytics = async () => {
  const allExceededCategoriesPromise = getExceededCategories();
  const budgetsPromise = getBudgets();

  const [allExceededCategories, budgets] = await Promise.all([
    allExceededCategoriesPromise,
    budgetsPromise,
  ]);

  return (
    <div className="h-screen flex flex-col 3xl:flex-row items-start gap-12 overflow-y-auto 3xl:overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)] mt-8 s:mt-0">
      <AnalyticsContent
        budgets={budgets}
        allExceededCategories={allExceededCategories}
      />
    </div>
  );
};

export default Analytics;
