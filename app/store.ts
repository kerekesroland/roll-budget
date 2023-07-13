"use client";
import { atom } from "recoil";

export const mobileOpen = atom({
  key: "mobileOpen",
  default: false,
});

export const inviteModelOpen = atom({
  key: "inviteModelOpen",
  default: false,
});