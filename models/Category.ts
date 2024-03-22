export interface ICategory {
  id: string;
  name: string;
  limit: number;
  current: number;
  currencyType: "USD" | "HUF";
  currentPerMonth: number;
  icon: string;
  userId: string;
}
