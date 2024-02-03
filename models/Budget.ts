import { CurrencyType } from "@prisma/client";

export interface IBudget {
  date: string;
  id: string;
  name: string;
  price: number;
  type: string;
  currencyType: CurrencyType;
  userId: string;
  categoryId: string | null;
}
