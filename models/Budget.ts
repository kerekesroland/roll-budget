export interface IBudget {
  date: string;
  id: string;
  name: string;
  price: number;
  type: string;
  userId: string;
  categoryId: string | null;
}
