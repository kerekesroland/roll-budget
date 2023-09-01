import { ICategory } from "@/models/Category";
import { TBudget } from "@/models/User";
import { Category } from "@prisma/client";
import { useCallback, useMemo } from "react";

interface IProps {
  categories: Array<Category> | null;
  budgets: TBudget[] | null;
  filters: any;
}

const useFilteredBudgets = ({ categories, budgets, filters }: IProps) => {
  const getBudgetCategory = useCallback(
    (categoryId: string) => {
      return categories?.find((category) => category.id === categoryId);
    },
    [categories]
  );

  const hasFilters = Object.values(filters).some((value) => value !== "");

  const budgetsWithCategory = useMemo(() => {
    return budgets?.map((budget) => {
      const category = getBudgetCategory(budget?.categoryId as string);
      return {
        ...budget,
        category: category?.name,
      };
    });
  }, [budgets, getBudgetCategory]);

  const filteredBudgets = useMemo(() => {
    if (!hasFilters || !budgetsWithCategory) {
      return budgetsWithCategory;
    }

    return budgetsWithCategory.filter(
      (budget) =>
        (budget.type === filters.type || filters.type === "") &&
        (budget?.category?.toLowerCase() === filters?.category?.toLowerCase() ||
          filters?.category === "") &&
        (!filters?.date || new Date(budget.date) <= filters?.date)
    );
  }, [
    budgetsWithCategory,
    filters.type,
    filters.category,
    filters.date,
    hasFilters,
  ]);

  const sortedBudgets = useMemo(() => {
    if (!hasFilters || !filteredBudgets) {
      return [...(filteredBudgets ?? [])]; // Create a shallow copy
    }

    return filteredBudgets.slice().sort((a: TBudget, b: TBudget) => {
      const priceComparison = a.price - b.price; // Price comparison

      if (filters.price === "low") {
        return priceComparison || a.name.localeCompare(b.name);
      } else {
        return -priceComparison || a.name.localeCompare(b.name);
      }
    });
  }, [filteredBudgets, filters.price, hasFilters]);

  return {
    sortedBudgets,
    getBudgetCategory,
  };
};

export default useFilteredBudgets;
