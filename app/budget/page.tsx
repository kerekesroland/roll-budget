import BudgetList from "@/components/BudgetList";
import { getCategories } from "@/lib/getCategories";
import getCurrentUser from "@/lib/getCurrentUser";

const Budget = async () => {
  const user = await getCurrentUser();
  const categories = await getCategories(user?.id as string);
  return (
    <div className="min-h-screen overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)]">
      <BudgetList user={user} categories={categories} />
    </div>
  );
};

export default Budget;
