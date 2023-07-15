"use client";
import { Category } from "@prisma/client";
import { atom } from "recoil";

export const mobileOpen = atom({
  key: "mobileOpen",
  default: false,
});

export const inviteModalOpen = atom({
  key: "inviteModelOpen",
  default: false,
});

export const budgetModalOpen = atom({
  key: "budgetModalOpen",
  default: false,
});

export const categoryModalOpen = atom({
  key: "categoryModalOpen",
  default: false,
});

export const budgetCategories = atom<Category[]>({
  key: "budgetCategories",
  default: [],
});
