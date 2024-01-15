import { IUser, TBudget } from "@/models/User";
import { Category } from "@prisma/client";

export type BudgetProps = {
  user: IUser | null;
  categories: Category[] | null;
  budgets: TBudget[] | null;
};

export interface IFilterProps {
  sortBy: string;
  type: string;
  price: string;
  category: string;
  date: Date | undefined;
}

export type FilterKeys = "sortBy" | "type" | "price" | "category" | "date";
