import { Budget, User } from '@prisma/client';

export type IUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type TBudget = Omit<Budget, "date"> & {
  date: string;
};
