import BudgetCategories from "@/components/budget/BudgetCategories";
import BudgetList from "@/components/budget/BudgetList";
import { getBudgets } from "@/lib/getBudgets";
import { getCategories } from "@/lib/getCategories";
import getCurrentUser from "@/lib/getCurrentUser";

const Budget = async () => {
  const userPromise = getCurrentUser();
  const categoriesPromise = userPromise.then((user) =>
    getCategories(user?.id as string)
  );
  const budgetsPromise = getBudgets();

  const [user, categories, budgets] = await Promise.all([
    userPromise,
    categoriesPromise,
    budgetsPromise,
  ]);

  return (
    <div className="h-screen flex flex-col 3xl:flex-row items-start gap-12 overflow-y-auto 3xl:overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)] mt-8 s:mt-0">
      <div className="w-full 3xl:w-2/3">
        <BudgetList budgets={budgets} user={user} categories={categories} />
      </div>
      <div className="w-full 3xl:w-1/3">
        <BudgetCategories categories={categories} user={user} />
      </div>
    </div>
  );
};

export default Budget;
