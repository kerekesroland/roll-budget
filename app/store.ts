"use client";
import { atom } from "recoil";

import { Category } from "@prisma/client";

interface RemindersFilter {
  priority: number | null;
  date?: Date | undefined;
}

export const mobileOpen = atom({
  key: "mobileOpen",
  default: false,
});

export const inviteModalOpen = atom({
  key: "inviteModelOpen",
  default: false,
});

export const budgetAddModalOpen = atom({
  key: "budgetAddModalOpen",
  default: false,
});

export const budgetEditModalOpen = atom({
  key: "budgetEditModalOpen",
  default: false,
});

export const categoryModalOpen = atom({
  key: "categoryModalOpen",
  default: false,
});

export const remindersModalOpen = atom({
  key: "remindersModalOpen",
  default: false,
});

export const remindersFilter = atom<RemindersFilter>({
  key: "remindersFilter",
  default: {
    priority: null,
    date: undefined,
  },
});

export const budgetCategories = atom<Category[]>({
  key: "budgetCategories",
  default: [],
});
